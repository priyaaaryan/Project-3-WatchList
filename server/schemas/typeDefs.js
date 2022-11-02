const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`
  type Movie {
    _id: ID
    movieId: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    release_date: String
    vote_average: Float
  }
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovies: [Movie]!
  }
  input MovieInput {
    movieId: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    release_date: String
    vote_average: Float
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
    saveMovie(input: MovieInput): User
    removeMovie(movieId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
