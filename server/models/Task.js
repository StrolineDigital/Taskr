const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
    });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;