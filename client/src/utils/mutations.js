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
  mutation saveMovie($input: MovieInput!) {
    saveMovie(input: $input) {
      _id
       username
       email
       savedMovies {
           movieId
           overview
           poster_path
           title
          popularity
     release_date
     vote_average
       }
   }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: ID!) {
    removeMovie(movieId: $movieId) {
      _id
      email  
      username
      movieCount
      savedMovies {
        _id
        movieId
        overview
        popularity
        poster_path
        release_date
        title
        vote_average
      }
    }
  }
`;
