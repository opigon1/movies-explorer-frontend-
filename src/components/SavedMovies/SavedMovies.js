import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';

function SavedMovies({ isLogged, savedMovies, setSavedMovies }) {
  const [renderedMovies, setRendererMovies] = React.useState(savedMovies);

  React.useEffect(() => {
    setRendererMovies(renderedMovies);
  }, [renderedMovies]);

  const deleteMovie = (movieId, likeHandler) => {
    mainApi.deleteMovie(movieId).then(() => {
      likeHandler(false);
      setSavedMovies((state) => state.filter((m) => m._id !== movieId));
      setRendererMovies((state) => state.filter((m) => m._id !== movieId));
    });
  };

  React.useEffect(() => {
    setRendererMovies(savedMovies);
  }, [savedMovies, setRendererMovies, renderedMovies]);

  return (
    <>
      <Header locarion={'location_movies'} isLogged={isLogged}>
        <Navigation location={'location_movies'} isLogged={isLogged} />
        <button
          className='header__burger header__burger_type_dark'
          type='button'
        ></button>
      </Header>
      <main className='saved-movies'>
        <SearchForm />
        {renderedMovies && (
          <MoviesCardList
            allMovies={renderedMovies}
            onDeleteMovie={deleteMovie}
            savedMovies={savedMovies}
          />
        )}
        {savedMovies.length === 0 && <p>Ничего не найдено</p>}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
