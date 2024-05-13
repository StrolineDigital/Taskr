const { AuthenticationError } = require('../utils/auth');
const { signToken } = require('../utils/auth');
const { User } = require('../models');
const jwt = require('jsonwebtoken');


const resolvers = {
 Query: {
   me: async (parent, args, context) => {


     const decodedToken = jwt.decode(context.headers['www-authenticate'], { complete: true });
     const userId = decodedToken.payload.data._id;
     const user = await User.findOne({ _id: userId });
     return user;
    
     //if (!context.user) throw new AuthenticationError('Not authenticated');
    
   },
   getTask: async (parent, { taskId }, context) => {
     const decodedToken = jwt.decode(context.headers['www-authenticate'], { complete: true });
     const userId = decodedToken.payload.data._id;
     const user = await User.findOne({ _id: userId });
     const task = user.tasks.id(taskId);
     return task;
    
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
   addUser: async (parent, args) => {
     console.log(args);
  //   const user = await User.create(args);
   //  const token = signToken(user);


     try {
       const user = await User.create(args);
       return { token: signToken(user), user };
     } catch (error) {
       console.error('Error creating user:', error);
       // Handle the error appropriately, such as returning an error response
     }
    
  
    // return { token, user };
   },
   addTask: async (parent, { taskdata }, context) => {
    // if (!context.user) throw new AuthenticationError('Not authenticated');
  
     console.log("you have entered the chat")
    
     const decodedToken = jwt.decode(context.headers['www-authenticate'], { complete: true });
     const userId = decodedToken.payload.data._id;
    
    console.log("my datat!!!", taskdata);
     const updatedUser = await User.findByIdAndUpdate(
       { _id: userId },
       { $addToSet: { tasks: taskdata } },
       { new: true }
     );
      return updatedUser;
   },


   updateTask: async (parent, { taskId, taskdata  }, context) => {
     const decodedToken = jwt.decode(context.headers['www-authenticate'], { complete: true });
     const userId = decodedToken.payload.data._id;
     const user = await User.findOne({ _id: userId });
     const allTasks = user.tasks; 
     console.log("viewing all the tasks", allTasks);
     allTasks.forEach(task => {
       console.log("here is the task id ", task._id); 
       console.log("here is the task we want to update ", taskId);
       if (task._id == taskId) { 
           
         task.text = taskdata.text; 
         task.isComplete = taskdata.isComplete;
       }
     }
     );
     console.log("UPDATED TASKS", allTasks);
     const updatedUser = await User.findOneAndUpdate(
       { _id: userId},
       { $set: { tasks: allTasks  } },
       { new: true }
      
     );
     return updatedUser;
   },


  
 


   deleteTask: async (parent, { taskId }, context) => {
     console.log(taskId);
     const decodedToken = jwt.decode(context.headers['www-authenticate'], { complete: true });
     const userId = decodedToken.payload.data._id;
      console.log(userId);
     const updatedUser = await User.findOneAndUpdate(
       { _id: userId },
       { $pull: { tasks: { _id: taskId } } },
       { new: true }
     );
      return updatedUser;
   },
 },
};


module.exports = resolvers;