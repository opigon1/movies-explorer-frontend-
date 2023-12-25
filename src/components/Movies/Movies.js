import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <>
      <Header locarion={'location_movies'}>
        <Navigation location={'location_movies'} />
        <Link
          className='header__account header__account_location_movies'
          to='/profile'
        >
          Аккаунт
        </Link>
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
