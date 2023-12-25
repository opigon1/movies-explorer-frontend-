import searchBtn from '../../images/search-btn.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <form className='search__form' name='search' action='#'>
      <div className='search__wrapper'>
        <label htmlFor='search' className='search__label'>
          <input
            className='search__input'
            type='text'
            id='search'
            name='search'
            placeholder='Фильм'
          />
        </label>

        <button className='search__button' type='button'>
          <img
            className='search__img'
            src={searchBtn}
            alt='Кнопка поиска'
          ></img>
        </button>
      </div>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
