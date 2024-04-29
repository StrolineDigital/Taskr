
const User = require('../models/User');
const {signToken} = require('../utils/auth');
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      try {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('savedBooks');

          return userData;
        }

        throw new AuthenticationError('Not logged in');
      } catch (error) {
        console.error('Error in me resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        const user = await User
          .findOne({ email });

        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.error('Error in login resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    }
    ,
    
          

    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error in addUser resolver:', error);
        throw error; // Re-throw the error to be caught by Apollo Server
      }
    },
  },
};

module.exports =  resolvers;