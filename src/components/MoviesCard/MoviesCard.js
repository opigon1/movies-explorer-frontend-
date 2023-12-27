import { useLocation } from 'react-router-dom';
import movieImg from '../../images/movies__img.png';

function MoviesCard() {
  const location = useLocation();
  const savedMoviesFilm = location.pathname === '/saved-movies';
  const moviesFilm = location.pathname === '/movies';

  return (
    <>
      <li className='movie-card'>
        <img className='movie-card__img' src={movieImg} alt='Обложка фильма' />
        <div className='movie-card__wrapper'>
          <h2 className='movie-card__title'>33 слова о дизайне</h2>
          {savedMoviesFilm && (
            <button type='button' className='movie-card__delete-btn'></button>
          )}
          {moviesFilm && (
            <button
              type='button'
              className='movie-card__save-btn movie-card__save-btn_type_active'
            ></button>
          )}
        </div>
        <span className='movie-card__duration'>1ч42м</span>
      </li>
      <li className='movie-card'>
        <img className='movie-card__img' src={movieImg} alt='Обложка фильма' />
        <div className='movie-card__wrapper'>
          <h2 className='movie-card__title'>33 слова о дизайне</h2>
          {savedMoviesFilm && (
            <button type='button' className='movie-card__delete-btn'></button>
          )}
          {moviesFilm && (
            <button
              type='button'
              className='movie-card__save-btn movie-card__save-btn_type_active'
            ></button>
          )}
        </div>
        <span className='movie-card__duration'>1ч42м</span>
      </li>
      <li className='movie-card'>
        <img className='movie-card__img' src={movieImg} alt='Обложка фильма' />
        <div className='movie-card__wrapper'>
          <h2 className='movie-card__title'>33 слова о дизайне</h2>
          {savedMoviesFilm && (
            <button type='button' className='movie-card__delete-btn'></button>
          )}
          {moviesFilm && (
            <button
              type='button'
              className='movie-card__save-btn movie-card__save-btn_type_active'
            ></button>
          )}
        </div>
        <span className='movie-card__duration'>1ч42м</span>
      </li>
      <li className='movie-card'>
        <img className='movie-card__img' src={movieImg} alt='Обложка фильма' />
        <div className='movie-card__wrapper'>
          <h2 className='movie-card__title'>33 слова о дизайне</h2>
          {savedMoviesFilm && (
            <button type='button' className='movie-card__delete-btn'></button>
          )}
          {moviesFilm && (
            <button
              type='button'
              className='movie-card__save-btn movie-card__save-btn_type_active'
            ></button>
          )}
        </div>
        <span className='movie-card__duration'>1ч42м</span>
      </li>
      <li className='movie-card'>
        <img className='movie-card__img' src={movieImg} alt='Обложка фильма' />
        <div className='movie-card__wrapper'>
          <h2 className='movie-card__title'>33 слова о дизайне</h2>
          {savedMoviesFilm && (
            <button type='button' className='movie-card__delete-btn'></button>
          )}
          {moviesFilm && (
            <button
              type='button'
              className='movie-card__save-btn movie-card__save-btn_type_active'
            ></button>
          )}
        </div>
        <span className='movie-card__duration'>1ч42м</span>
      </li>
    </>
  );
}

export default MoviesCard;
