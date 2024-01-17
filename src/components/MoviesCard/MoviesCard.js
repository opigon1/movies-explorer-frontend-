import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { convertMovieTime } from '../../utils/convertMovieTime';

function MoviesCard({ savedMovies, onDeleteMovie, onSaveMovie, ...props }) {
  const [isSaved, setIsSaved] = React.useState(false);
  const location = useLocation();
  const savedMoviesFilm = location.pathname === '/saved-movies';
  const moviesFilm = location.pathname === '/movies';
  console.log(savedMovies);
  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id]);

  const handleSaveMovie = () => {
    const movieData = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: `https://api.nomoreparties.co/` + props.image.url,
      trailerLink: props.trailerLink,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
      thumbnail:
        `https://api.nomoreparties.co/` + props.image.formats.thumbnail.url,
      movieId: props.id,
    };
    onSaveMovie(movieData, setIsSaved);
  };

  const handleDelete = () => {
    onDeleteMovie(props.id || props._id, setIsSaved);
  };

  return (
    <li className='movie-card'>
      <a href={props.trailerLink} target='_blanck'>
        <img
          className='movie-card__img'
          src={
            savedMoviesFilm
              ? props.image
              : `https://api.nomoreparties.co/${props.image.url}`
          }
          alt='Обложка фильма'
        />
      </a>
      <div className='movie-card__wrapper'>
        <h2 className='movie-card__title'>{props.nameRU}</h2>
        {savedMoviesFilm && (
          <button
            type='button'
            className='movie-card__delete-btn'
            onClick={handleDelete}
          ></button>
        )}
        {moviesFilm && (
          <button
            onClick={isSaved ? handleDelete : handleSaveMovie}
            type='button'
            className={
              isSaved
                ? 'movie-card__save-btn movie-card__save-btn_type_active'
                : 'movie-card__save-btn'
            }
          ></button>
        )}
      </div>
      <span className='movie-card__duration'>
        {convertMovieTime(props.duration)}
      </span>
    </li>
  );
}

export default MoviesCard;
