// Import Models
const { User } = require("../models");

// Automatically Relay Errors to Client
const { AuthenticationError } = require("apollo-server-express");

// Import JWTs
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password')
       
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    saveMovie: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user);
        console.log(args);
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedMovie: args.input } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please log in!");
    },
    removeMovie: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMovie: { movie_id: args.movieId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Please log in!");
    },
  },
};
module.exports = resolvers;
