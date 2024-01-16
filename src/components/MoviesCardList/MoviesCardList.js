import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  allMovies,
  children,
  onSaveMovie,
  savedMovies,
  onDeleteMovie,
}) {
  return (
    <section className='movies'>
      <ul className='movies-list'>
        {Array.isArray(allMovies) &&
          allMovies.map((movie) => (
            <MoviesCard
              {...movie}
              key={movie.id || movie._id}
              onSaveMovie={onSaveMovie}
              savedMovies={savedMovies}
              onDeleteMovie={onDeleteMovie}
            />
          ))}
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
