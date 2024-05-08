const { AuthenticationError } = require("../utils/auth");
const { signToken } = require("../utils/auth");
const { Task } = require("../models/Task"); // this will lead to an error, try to model line 6
const { User } = require("../models");

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
    addTask: async (parent, { title, description, dueDate }, context) => {
      if (!context.user) throw new AuthenticationError("Not authenticated");
      const task = new Task({
        title,
        description,
        dueDate,
        user: context.user._id,
      });
      await task.save();
      await User.findByIdAndUpdate(context.user._id, {
        $push: { tasks: task._id },
      });
      return task;
    },
    updateTask: async (
      parent,
      { taskId, title, description, dueDate, completed }
    ) => {
      const updates = { title, description, dueDate, completed };
      return await Task.findByIdAndUpdate(taskId, updates, { new: true });
    },
    deleteTask: async (parent, { taskId }) => {
      return await Task.findByIdAndDelete(taskId);
    },
  },
};

module.exports = resolvers;
