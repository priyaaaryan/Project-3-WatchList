// route to get logged in user's info (needs the token)
// import axios from 'axios'
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// save movie data for a logged in user
export const saveMovie = (bookData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved movie data for a logged in user
export const deleteMovie = (bookId, token) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
const baseUrl = "https://api.themoviedb.org/3/";
const api_key = "2b331b737fa1907712028caf08fca5d5";
/*
{
    "adult": false,
    "backdrop_path": "/f7BKz0EkxYudtUeyb0uyJ1BkaKW.jpg",
    "genre_ids": [
        35,
        18
    ],
    "id": 77434,
    "original_language": "en",
    "original_title": "What's Cooking?",
    "overview": "In LA's Fairfax district, where ethnic groups abound, four households celebrate Thanksgiving amidst family tensions. In the Nguyen family, the children's acculturation and immigrant parents' fears collide. In the Avila family, Isabel's son has invited her estranged husband to their family dinner. Audrey and Ron Williams want to keep their own family's ruptures secret from Ron's visiting mother. In the Seelig household, Herb and Ruth are unwilling to discuss openly their grown daughter's living with her lover, Carla. Around each table, things come to a head. A gun, an affair, a boyfriend, and a pregnancy precipitate crises forcing each family to find its center.",
    "popularity": 3.358,
    "poster_path": "/1kK3fktULJ4FpXoeruTY7n34Hq0.jpg",
    "release_date": "2000-01-20",
    "title": "What's Cooking?",
    "video": false,
    "vote_average": 5.6,
    "vote_count": 18
}
*/

export const searchMovies = (query) => {
  return fetch(`${baseUrl}search/movie?api_key=${api_key}&query=${query}`);
};



