const { Schema } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = taskSchema;
