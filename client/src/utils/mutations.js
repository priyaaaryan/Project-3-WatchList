import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation($email: String!, $password: String!){
  login(email: $email, password: $password) {
    token
	user {
        _id
        username
      }
  }
}
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//First we are declaring a mutation, in the mutation we will define the mutation that will receive the book information to save.
export const SAVE_MOVIE = gql`
  mutation saveMovie($input: movieInput!) {
    saveMovie(input: $input) {
      id
      username
      email
      movieCount
      savedMovies {
        movieId
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId: $movieId) {
      id
      username
      email
      movieCount
      savedMovies {
        movieId
      }
    }
  }
`;
