function FilterCheckbox() {
  return (
    <label
      className='filter__label filter__label_type_checkbox'
      htmlFor='checkbox'
    >
      <input
        className='filter__checkbox'
        type='checkbox'
        id='checkbox'
        name='checkbox'
      />
      <span className='filter__visible-checkbox'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
