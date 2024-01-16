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
import { getOneIdByAnother } from '../../utils/constants';

function Movies({ isLogged, savedMovies, setSavedMovies }) {
  const [movie, setMovie] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleMovies, setVisibleMovies] = React.useState(16);
  const [checkShortFilm, setCheckShortFilms] = React.useState(false);
  const screenWidth = window.innerWidth;
  const queryData = localStorage.getItem('queryData');

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

  // const handleCheckbox = (isOnlyShortFilms) => {
  //   if (queryData !== null) {
  //     const moviesFromStorage = JSON.parse(queryData).filteredMovies;

  //     if (isOnlyShortFilms) {
  //       setMovie(moviesFromStorage);
  //     } else {
  //       setMovie(findOnlyShortMovies(moviesFromStorage));
  //     }
  //   }
  //   return;
  // };

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
      const allMovies = await moviesApi.getMovies().then((res) => res);
      filteredMovies = await filterMovies(searchQuery, allMovies);
      filteredShortMovies = findOnlyShortMovies(filteredMovies);

      const queryData = {
        allMovies,
        searchQuery: searchQuery,
        filteredMovies,
        filteredShortMovies,
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
    if (screenWidth <= 480) {
      setVisibleMovies(5);
    } else if (screenWidth <= 768) {
      setVisibleMovies(16);
    } else {
      setVisibleMovies(16);
    }
  };
  return (
    <>
      <Header locarion={'location_movies'} isLogged={isLogged}>
        <Navigation location={'location_movies'} isLogged={isLogged} />
        <button
          className='header__burger header__burger_type_dark'
          type='button'
        ></button>
      </Header>
      <main className='movies-page'>
        <SearchForm
          submitHandler={submitHandler}
          checkbox={checkShortFilm}
          setCheckbox={setCheckShortFilms}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            allMovies={movie}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handkeDeleteMovie}
            savedMovies={savedMovies}
          >
            {visibleMovies < movie.length && (
              <button
                className='movies-list__more-btn'
                onClick={() =>
                  setVisibleMovies(
                    (prev) => prev + (screenWidth <= 480 ? 1 : 4)
                  )
                }
              >
                Ещё
              </button>
            )}
          </MoviesCardList>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
