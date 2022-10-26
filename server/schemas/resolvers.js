const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          //.select("-__v -password")
          .populate("books");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    // books: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Book.find(params).sort({ createdAt: -1 });
    // },

    // place this inside of the `Query` nested object right after `thoughts`
    // book: async (parent, { _id }) => {
    //   return Book.findOne({ _id });
    // },

    // // get all users
    // users: async () => {
    //   return User.find().select("-__v -password").populate("books");
    // },
    // // get a user by username
    // user: async (parent, { username }) => {
    //   return User.findOne({ username })
    //     .select("-__v -password")
    //     .populate("books");
    // },
  },
  Mutation: {
    saveBook: async (parent, { input }, context) => {
      console.log("input=", input);

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        );
        console.log("UPDATED USER NEW BOOK=", updatedUser);
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeBook: async (parent, { bookId }, context) => {
      // if (context.user) {
      //   const deleteBook = await Book.findOneAndDelete({ bookId: bookId });

      //   return deleteBook;
      // }

      console.log("bookId=", bookId);

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedBooks: {
                bookId: bookId,
              },
            },
          },
          { new: true }
        );
        console.log("UPDATED USER REM BOOK=", updatedUser);
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // addThought: async (parent, args, context) => {
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       ...args,
    //       username: context.user.username,
    //     });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { thoughts: thought._id } },
    //       { new: true }
    //     );

    //     return thought;
    //   }

    //   throw new AuthenticationError("You need to be logged in!");
    // },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log("login email=", email);
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
  },
};

module.exports = resolvers;
