import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { filterMovies, findOnlyShortMovies } from '../../utils/moviesFilters';
import { CurrentUserContext } from '../../context/currentUserContext';

function SavedMovies({ isLogged, savedMovies, setSavedMovies }) {
  const [searchFilter, setSearchFilter] = useState({
    searchQuery: '',
    checkShortFilm: false,
  });
  const [renderedMovies, setRendererMovies] = useState(savedMovies);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((moviesData) => {
        const savedMovieOwner = moviesData.filter(
          (movie) => movie.owner === currentUser?.data?._id
        );
        localStorage.setItem('savedMovies', JSON.stringify(savedMovieOwner));
        setSavedMovies(savedMovieOwner);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser, setSavedMovies, isLogged]);

  useEffect(() => {
    const savedMoviesStorage = JSON.parse(localStorage.getItem('savedMovies'));
    setRendererMovies(savedMoviesStorage || []);
  }, []);

  const submitHandler = (shortFilm, searchQuery) => {
    setSearchFilter({
      searchQuery: searchQuery,
      checkShortFilm: shortFilm,
    });
  };

  const deleteMovie = (movieId, likeHandler) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        likeHandler(false);
        const updatedMovies = savedMovies.filter((m) => m._id !== movieId);
        setSavedMovies(updatedMovies);
        setRendererMovies(updatedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const { searchQuery, checkShortFilm } = searchFilter;

    const filteredMovies = filterMovies(searchQuery, savedMovies);
    const filteredShortMovies = findOnlyShortMovies(filteredMovies);

    const moviesToDisplay = checkShortFilm
      ? filteredShortMovies
      : filteredMovies;

    setRendererMovies(moviesToDisplay);
    localStorage.setItem('savedMovies', JSON.stringify(moviesToDisplay));
  }, [searchFilter, savedMovies]);

  return (
    <>
      <Header locarion={'location_movies'} isLogged={isLogged}>
        <Navigation location={'location_movies'} isLogged={isLogged} />
      </Header>
      <main className='saved-movies'>
        <SearchForm
          submitHandler={submitHandler}
          checkbox={searchFilter.checkShortFilm}
          setCheckbox={(value) =>
            setSearchFilter((prev) => ({ ...prev, checkShortFilm: value }))
          }
        />
        {renderedMovies && (
          <MoviesCardList
            allMovies={renderedMovies}
            onDeleteMovie={deleteMovie}
            savedMovies={savedMovies}
          />
        )}
        {renderedMovies.length === 0 && (
          <p className='movies-page__error'>Ничего не найдено</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
