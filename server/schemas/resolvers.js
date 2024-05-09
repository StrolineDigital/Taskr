const { AuthenticationError } = require("../utils/auth");
const { signToken } = require("../utils/auth");
const { User, Task } = require("../models");
const jwt = require("jsonwebtoken");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError("Not authenticated");
      return await User.findById(context.user._id).populate("tasks");
    },
    getTasks: async () => {
      return await Task.find({});
    },
    getTask: async (parent, { taskId }) => {
      return await Task.findById(taskId);
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Incorrect credentials");
      }

      return { token: signToken(user), user };
    },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        return { token: signToken(user), user };
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
    addTask: async (parent, { taskdata }, context) => {
      // if (!context.user) throw new AuthenticationError('Not authenticated');

      const decodedToken = jwt.decode(context.headers["www-authenticate"], {
        complete: true,
      });
      const userId = decodedToken.payload.data._id;

      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { tasks: taskdata } },
        { new: true }
      );

      return updatedUser;
    },
    updateTask: async (
      parent,
      { taskId, title, description, dueDate, completed }
    ) => {
      const updates = { title, description, dueDate, completed };
      return await Task.findByIdAndUpdate(taskId, updates, { new: true });
    },
    deleteTask: async (parent, { taskId }, context) => {
      console.log(taskId);
      const decodedToken = jwt.decode(context.headers["www-authenticate"], {
        complete: true,
      });
      const userId = decodedToken.payload.data._id;

      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { taskId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;
