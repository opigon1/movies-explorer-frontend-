import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies({ isLogged }) {
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
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
