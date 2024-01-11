import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ isLogged }) {
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
        <SearchForm />
        <MoviesCardList>
          <button className='movies-list__more-btn'>Ещё</button>
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
