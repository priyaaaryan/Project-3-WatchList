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
import { useParams } from "react-router-dom";




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
      width: '150px',
      padding: '10px',
      backgroundColor: '#ed145b',
      borderRadius: '20px',
      marginLeft: '20px',
      cursor: 'pointer',
      border: 'none'
  }

}



const SearchBooks = () => {

  const { id } = useParams();
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
    return () => saveMovieIds(savedMovieIds);
  });
  



  const removeAdultMovies = (movies)=>{

  return movies.filter((movie)=>{
  return !movie.adult;

  });
  }
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
      console.log("1", results1);

      
      const response2 = await searchMovies(searchInput,2);

      if (!response2.ok) {
        throw new Error("something went wrong!");
      }

      const { results: results2} = await response2.json();
      console.log("2",results2);

      const results = results1.concat(results2); 
      const filteredResults = removeAdultMovies(results);
      
      setsearchedMovies(filteredResults);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };


  

  //Watch Trailer

  //const id1 = searchedMovies.id;

  //console.log(id1);
  // create function to handle saving a book to our database
  const handleSaveMovie = async (movieId) => {
    // find the book in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.id === movieId);
    console.log(movieToSave);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {response} = await saveMovie({variables: {input:{
        movieId:movieToSave.id,
        title:movieToSave.title,
        overview:movieToSave.overview, 
        poster_path:movieToSave.poster_path,
        popularity:movieToSave.popularity,
        rating:movieToSave.vote_average,
        releasedate:movieToSave.release_date

        
      }}}
      );
      console.log("response after saving movie: ",response);

      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }

      // if book successfully saves to user's account, save book id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  
 

  async function loadMovieDetails(){ 
    const id = searchedMovies.find((movie) => movie.id === id);

    
    const apiTrailer = await fetch (`http://api.themoviedb.org/3/movie/${id}/videos?api_key=2b331b737fa1907712028caf08fca5d5`).then( result=>result.json());
    

    console.log("trailer",apiTrailer.result);
    setMovieTrailer(apiTrailer.result);

}


useEffect(function(){
  loadMovieDetails();
},[])
  

  return (
    <>
      <Jumbotron fluid className="hero">
        <Container>
          <div class = "searchBox">
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
                  style={style.myInput}
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg"  bg-color="red" style={style.myBtnRgt}>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
          </div>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : " "}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
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
                  <Card.Text>Release Date :-  {movie.release_date}</Card.Text>
                  <Card.Text>Popularity :-  {movie.popularity}</Card.Text>
                  <Card.Text>Rating :- {movie.vote_average}</Card.Text>
                  <Card.Text>
                Trailers:-
                
                {movieTrailer !== undefined ? movieTrailer.slice(0,3).map(movie => 
                    <div class="mr-4 mt-4">
                        <iframe width="340" height="215" src={`https://www.youtube.com/embed/${movie.key}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div> ): "Sorry Trailers cannot be Uploaded"} </Card.Text>
                
            
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.id
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveMovie(movie.id)}
                    >
                      {savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.id
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
