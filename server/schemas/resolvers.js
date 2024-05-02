const User = require('../models/User');
const Task = require('../models/Task');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      return await User.findById(context.user._id).populate('tasks');
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
        throw new AuthenticationError('Incorrect credentials');
      }

      return { token: signToken(user), user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      return { token: signToken(user), user };
    },
    addTask: async (parent, { title, description, dueDate }, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      const task = new Task({ title, description, dueDate, user: context.user._id });
      await task.save();
      await User.findByIdAndUpdate(context.user._id, { $push: { tasks: task._id } });
      return task;
    },
    updateTask: async (parent, { taskId, title, description, dueDate, completed }) => {
      const updates = { title, description, dueDate, completed };
      return await Task.findByIdAndUpdate(taskId, updates, { new: true });
    },
    deleteTask: async (parent, { taskId }) => {
      return await Task.findByIdAndDelete(taskId);
    },
  },
};

module.exports = resolvers;