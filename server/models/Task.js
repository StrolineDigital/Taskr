const { Schema } = require("mongoose");
//This model will be used to create the tasks that will be associated with each user
const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
 
    isComplete: {
    type: Boolean,
    default: false,
  },
});

module.exports = taskSchema;
  
  

