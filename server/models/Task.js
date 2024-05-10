const { Schema } = require("mongoose");
//This model will be used to create the tasks that will be associated with each user
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
