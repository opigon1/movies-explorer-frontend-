export const filterMovies = (searchQuery, moviesArray) => {
  const regex = new RegExp(searchQuery, 'gi');
  return moviesArray.filter(
    (movie) => regex.test(movie.nameRU) || regex.test(movie.nameEN)
  );
};

export const findOnlyShortMovies = (movies) => {
  return movies.filter((movie) => movie.duration < 40);
};
