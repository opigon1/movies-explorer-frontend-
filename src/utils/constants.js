export const apiConfig = {
  url: "https://api.project.mesto.nomoredomainsmonster.ru/",
  // url: 'http://localhost:3000',
  headers: {
    'content-type': 'application/json',
  },
};

export const moviesConfig = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'content-type': 'application/json',
  },
};

export const getOneIdByAnother = (id, array) => {
  const searchItem = array.find((movie) => movie.movieId === id);
  return searchItem._id;
};
