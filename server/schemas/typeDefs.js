const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    overview: String
    poster_path: String
    popularity: Decimal
    release_date: String
    vote_average: Decimal
  }
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovie: [Movie]
  }
  input SavedMovie {
    id: Int
    title: String
    overview: String
    poster_path: String
    popularity: Decimal
    release_date: String
    vote_average: Decimal
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
    savedMovie(input: SavedMovie!): User
    removeMovie(id: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
