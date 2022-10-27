const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`
  type Movie {
    movie_id: Int
    title: String
    overview: [String]
  }
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovie: [Movie]
  }
  input savedMovie {
    movie_id: Int
    title: String
    overview: [String]
  }

  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedMovie(input: savedMovie!): User
    removeMovie(movie_id: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
