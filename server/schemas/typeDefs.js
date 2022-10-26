// import the gql tagged template function
const { gql } = require("apollo-server-express");
//TODO: User.savedBooks cannot be null
// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: ID!
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input SaveBookInput {
    authors: [String]
    description: String!
    bookId: ID!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput): User
    removeBook(bookId: ID!):User
  }


`;

// export the typeDefs
module.exports = typeDefs
