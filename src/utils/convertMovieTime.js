export const convertMovieTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);
  return `${hours}ч ${minutes}м`;
}