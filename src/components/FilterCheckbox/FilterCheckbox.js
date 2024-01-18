import React, { useEffect } from 'react';

function FilterCheckbox({ onClickCheckbox, shortFilmsCheck }) {
  return (
    <label
      className='filter__label filter__label_type_checkbox'
      htmlFor='checkbox'
    >
      <input
        className='filter__checkbox'
        type='checkbox'
        id='checkbox'
        name='shortFilm'
        onChange={onClickCheckbox}
        checked={shortFilmsCheck}
      />
      <span className='filter__visible-checkbox'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
