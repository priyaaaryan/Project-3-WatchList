export const getSavedMovieIds = () => {
  const savedMovieIds = localStorage.getItem('saved_Movies')
    ? JSON.parse(localStorage.getItem('saved_Movies'))
    : [];

  return savedMovieIds;
};

export const saveMovieIds = (movieIdArr) => {
  if (movieIdArr.length) {
    localStorage.setItem('saved_Movies', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('saved_Movies');
  }
};

export const removeMovieId = (movieId) => {
  const savedMovieIds = localStorage.getItem('saved_Movies')
    ? JSON.parse(localStorage.getItem('saved_Movies'))
    : null;

  if (!savedMovieIds) {
    return false;
  }

  const updatedSavedMovieIds = savedMovieIds?.filter((savedMovieId) => savedMovieId !== movieId);
  localStorage.setItem('saved_Movie', JSON.stringify(updatedSavedMovieIds));

  return true;
};
