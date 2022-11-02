// import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
// import { getMe, deleteBook } from '../utils/API';
import Auth from "../utils/auth";
import { removeMovieId } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";
const SavedBooks = () => {
  // const [userData, setUserData] = useState({});
  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;
  //       if (!token) {
  //         return false;
  //       }
  //       const response = await getMe(token);
  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }
  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getUserData();
  // }, [userDataLength]);
  const { queryData } = useQuery(GET_ME);
  const userData = queryData?.me || {};
  const userDataLength = Object.keys(userData).length;
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
       const{input}=await removeMovie({ variables: {movieId}});
      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }
      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      console.log(input);
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };
  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved movies!"}
        </h2>
        <CardColumns>
          {userData.savedMovies.map((movie) => {
            return (
              <Card key={movie.id} border="dark">
                {movie.poster_path ? (
                  <Card.Img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={`The poster for ${movie.title}`}
                  variant="top"
                  />
                ) : null}
                <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Card.Text>Release Date {movie.release_date}</Card.Text>
                  <Card.Text>Popularity {movie.popularity}</Card.Text>
                  <Card.Text>Rating {movie.vote_average}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(movie.id)}
                  >
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
