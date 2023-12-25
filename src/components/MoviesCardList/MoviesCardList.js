import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ children }) {
  return (
    <section className='movies'>
      <ul className='movies-list'>
        <MoviesCard />
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
