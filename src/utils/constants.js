export const apiConfig = {
  url: 'https://api.movie.diplom.nomoredomainsmonster.ru',
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

export const INITIAL_VISIBLE_MOVIES = 16;
export const MOBILE_SCREEN_WIDTH = 480;
export const TABLET_SCREEN_WIDTH = 768;
export const CONFLICT = 409;
export const BAD_REQUEST = 400;
