import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me{
    me {
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

