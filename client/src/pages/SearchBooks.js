import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_MOVIE } from "../utils/mutations";

import Auth from "../utils/auth";
import { searchMovies } from "../utils/API";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";

const style = {
  myForm: {
      width: "70%",
      margin: "50px"
  }, 
  myInput: {
      borderTopLeftRadius: '20px',
      borderRadius: '20px',
      borderBottomLeftRadius: '20px'
  },
  myBtnRgt: {
      width: '100',
      padding: '10px',
      backgroundColor: '#ed145b',
      borderRadius: '20px',
      marginLeft: '20px',
      cursor: 'pointer',
      border: 'none'
  }

}


const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedMovies, setsearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  const [ movieTrailer, setMovieTrailer ]= useState([]);

  // create state to hold saved bookId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  const [saveMovie] = useMutation(SAVE_MOVIE);
  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    console.log("Saved movie Ids: ", savedMovieIds)
    saveMovieIds(savedMovieIds);
    loadMovieDetails()
  }, [searchedMovies]);

  async function loadMovieDetails(){ 
    console.log(searchedMovies)
    let id = searchedMovies.find((movie) => {
      console.log(movie);
      if(movie.title == searchInput) {
        return movie.id;
      }
    });
 
     //const id = [436270,43641 , 1040330, 640810 ,690369];
 
     if(!id) {
       id = 1;
      }
      console.log(id)
      console.log(typeof id)
      //console.log(id.toString())
      //console.log(JSON.stringify(id));
    let searchedMovieObject = JSON.stringify(id);
    console.log(searchedMovieObject);

    let movieId = JSON.parse(searchedMovieObject).id;
    console.log(`Movie ID: ${movieId}`)
     // const url = "http://api.themoviedb.org/3/movie/"+id.toString()+"/videos?api_key=2b331b737fa1907712028caf08fca5d5";    
      const url = "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=2b331b737fa1907712028caf08fca5d5";    
      console.log(`URL: ${url}`);
      const apiTrailer = await fetch (url).then( result=>result.json());
      let apiTrailerObj = JSON.stringify(apiTrailer.results);
      //let moviKey = JSON.parse(apiTrailerObj);
      //let movieKey = JSON.parse(apiTrailerObj).key;
     console.log(`trailerReaults: ${apiTrailerObj}`);
     setMovieTrailer(apiTrailerObj);
 }

 console.log(`Trailer: ${movieTrailer}`);

 /*useEffect(function(){
  loadMovieDetails();
},[])*/

  const removeAdultMovies = (movies) => {
    return movies.filter((movie) => {
      return !movie.adult;
    });
  };
  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response1 = await searchMovies(searchInput);

      if (!response1.ok) {
        throw new Error("something went wrong!");
      }

      const { results: results1 } = await response1.json();
      console.log(results1);

      const response2 = await searchMovies(searchInput, 2);

      if (!response2.ok) {
        throw new Error("something went wrong!");
      }

      const { results: results2 } = await response2.json();
      console.log(results2);

      const results = results1.concat(results2);
      const filteredResults = removeAdultMovies(results);

      // const moviesData = results.map((movie) => ({
      //   id: movie.id,
      //   name: movie.name,
      //   picture: movie.picture
      // }));

      setsearchedMovies(filteredResults);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveMovie = async (movieId) => {
    // find the book in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.id === movieId);
    console.log("MOViE TO SAVE: ", movieToSave);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      console.log("Before Saved Movie");
      const response = await saveMovie({variables: {input:{
        movieId:movieToSave.id,
        title:movieToSave.title,
        overview:movieToSave.overview,
        poster_path:movieToSave.poster_path,
        popularity:movieToSave.popularity,
        vote_average:movieToSave.vote_average,
        release_date:movieToSave.release_date
        
      }}}
      );
     
      // const response  = await saveMovie({
      //   variables: {
      //     input: {
      //       ...movieToSave,
      //     },
      //   },
      // });

      console.log("response after saving movie: ", response);

      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }

      // if book successfully saves to user's account, save book id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.id]);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(" Saved movie IDs:", savedMovieIds)
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
        <h1>Enter a Movie Name or TV Show</h1>
          <p>Find millon movies and TV Shows. Explore Now</p>
          <Form onSubmit={handleFormSubmit} style={style.myForm}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a Movie"
                  style = {style.myInput}
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg" bg-color = "red" style={style.myBtnRgt}>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : "Search for a movie to begin"}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            console.log("Movie to be saved:" ,movie);
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

                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.id
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveMovie(movie.id)}
                    >
                      {savedMovieIds?.some(
                        (savedMovieId) => {
                         console.log("Saved Movie ID: ",savedMovieId);
                          return savedMovieId === movie.id
                        
                        }

                      )
                        ? "This movie has already been saved!"
                        : "Save this Movie!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;
