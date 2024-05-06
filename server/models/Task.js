const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      dueDate: {
        type: String, 
      },
      completed: {
        type: Boolean,
        default: false
      }
    });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;