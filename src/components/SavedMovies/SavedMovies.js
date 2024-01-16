import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { filterMovies, findOnlyShortMovies } from '../../utils/moviesFilters';

function SavedMovies({ isLogged, savedMovies, setSavedMovies }) {
  const [renderedMovies, setRendererMovies] = React.useState(savedMovies);
  const [checkShortFilm, setCheckShortFilms] = React.useState(false);

  React.useEffect(() => {
    const savedMoviesStorage = JSON.parse(localStorage.getItem('savedMovies'));
    setRendererMovies(savedMoviesStorage || []);
  }, []);

  const submitHandler = (shortFilm, searchQuery) => {
    const filteredMovies = filterMovies(searchQuery, savedMovies);
    const filteredShortMovies = findOnlyShortMovies(filteredMovies);

    const moviesToDisplay = shortFilm ? filteredShortMovies : filteredMovies;

    setRendererMovies(moviesToDisplay);
  };

  const deleteMovie = (movieId, likeHandler) => {
    mainApi.deleteMovie(movieId).then(() => {
      likeHandler(false);
      const updatedMovies = savedMovies.filter((m) => m._id !== movieId);
      setSavedMovies(updatedMovies);
      setRendererMovies(updatedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
    });
  };

  React.useEffect(() => {
    const moviesToDisplay = checkShortFilm
      ? findOnlyShortMovies(savedMovies)
      : savedMovies;

    setRendererMovies(moviesToDisplay);
    localStorage.setItem('savedMovies', JSON.stringify(moviesToDisplay));
  }, [checkShortFilm, savedMovies]);

  return (
    <>
      <Header locarion={'location_movies'} isLogged={isLogged}>
        <Navigation location={'location_movies'} isLogged={isLogged} />
      </Header>
      <main className='saved-movies'>
        <SearchForm
          submitHandler={submitHandler}
          checkbox={checkShortFilm}
          setCheckbox={setCheckShortFilms}
        />
        {renderedMovies && (
          <MoviesCardList
            allMovies={renderedMovies}
            onDeleteMovie={deleteMovie}
            savedMovies={savedMovies}
          />
        )}
        {savedMovies.length === 0 && (
          <p className='movies-page__error'>Ничего не найдено</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
