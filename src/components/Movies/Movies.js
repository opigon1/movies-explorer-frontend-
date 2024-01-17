import React, { useEffect } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { filterMovies, findOnlyShortMovies } from '../../utils/moviesFilters';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { getOneIdByAnother } from '../../utils/getOneIdByAnother';
import {
  INITIAL_VISIBLE_MOVIES,
  MOBILE_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
} from '../../utils/constants';

function Movies({ isLogged, savedMovies, setSavedMovies }) {
  const [movie, setMovie] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleMovies, setVisibleMovies] = React.useState(
    INITIAL_VISIBLE_MOVIES
  );
  const [checkShortFilm, setCheckShortFilms] = React.useState(false);
  const [lastSearchQuery, setLastSearchQuery] = React.useState('');
  const screenWidth = window.innerWidth;
  const queryData = localStorage.getItem('queryData');

  useEffect(() => {
    if (queryData) {
      setLastSearchQuery(JSON.parse(queryData)?.searchQuery);
      setCheckShortFilms(JSON.parse(queryData)?.shortFilm);
    }
  }, []);

  useEffect(() => {
    if (queryData) {
      const newQueryData = JSON.parse(queryData);
      newQueryData.shortFilm = checkShortFilm;
      localStorage.setItem('queryData', JSON.stringify(newQueryData));
    }
  }, [checkShortFilm, queryData]);

  useEffect(() => {
    const handleResizeWithTimeout = () => {
      setTimeout(() => {
        handleResize();
      }, 200);
    };

    handleResizeWithTimeout();
    window.addEventListener('resize', handleResizeWithTimeout);
    return () => {
      window.removeEventListener('resize', handleResizeWithTimeout);
    };
  }, []);

  let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
  let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];

  React.useEffect(() => {
    checkShortFilm ? setMovie(filteredShortMovies) : setMovie(filteredMovies);
  }, [checkShortFilm]);

  const handleSaveMovie = (movie, likeHandler) => {
    mainApi
      .addMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        likeHandler(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handkeDeleteMovie = (movieId, likeHandler) => {
    const savedMovieId = getOneIdByAnother(movieId, savedMovies);
    mainApi
      .deleteMovie(savedMovieId)
      .then(() => {
        likeHandler(false);
        setSavedMovies((state) => state.filter((m) => m._id !== savedMovieId));
      })
      .catch((err) => console.error(err));
  };

  const submitHandler = async (shortFilm, searchQuery) => {
    try {
      setIsLoading(true);
      const allMovies = await moviesApi
        .getMovies()
        .then((res) => res)
        .catch((err) => console.log(err));
      filteredMovies = await filterMovies(searchQuery, allMovies);
      filteredShortMovies = findOnlyShortMovies(filteredMovies);

      const queryData = {
        searchQuery,
        filteredMovies,
        filteredShortMovies,
        shortFilm,
      };

      localStorage.setItem('queryData', JSON.stringify(queryData));

      shortFilm ? setMovie(filteredShortMovies) : setMovie(filteredMovies);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleResize = () => {
    if (screenWidth <= MOBILE_SCREEN_WIDTH) {
      setVisibleMovies(5);
    } else if (screenWidth <= TABLET_SCREEN_WIDTH) {
      setVisibleMovies(INITIAL_VISIBLE_MOVIES);
    } else {
      setVisibleMovies(INITIAL_VISIBLE_MOVIES);
    }
  };
  return (
    <>
      <Header locarion={'location_movies'} isLogged={isLogged}>
        <Navigation location={'location_movies'} isLogged={isLogged} />
      </Header>
      <main className='movies-page'>
        <SearchForm
          submitHandler={submitHandler}
          checkbox={checkShortFilm}
          setCheckbox={setCheckShortFilms}
          lastSearchQuery={lastSearchQuery}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            allMovies={movie.slice(0, visibleMovies)}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handkeDeleteMovie}
            savedMovies={savedMovies}
          >
            {visibleMovies < movie.length && (
              <button
                className='movies-list__more-btn'
                onClick={() =>
                  setVisibleMovies(
                    (prev) =>
                      prev + (screenWidth <= MOBILE_SCREEN_WIDTH ? 1 : 4)
                  )
                }
              >
                Ещё
              </button>
            )}
          </MoviesCardList>
        )}
        {movie.length === 0 && (
          <p className='movies-page__error'>Ничего не найдено</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
