// SearchForm.js
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import searchBtn from '../../images/search-btn.svg';

function SearchForm({ submitHandler, checkbox, setCheckbox }) {
  const {
    methods,
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
  } = useForm({
    mode: 'onSubmit',
  });

  const onClickCheckbox = () => setCheckbox(!checkbox);

  const onSubmit = async () => {
    submitHandler(checkbox, watch('search'));
  };

  return (
    <FormProvider {...methods}>
      <form
        className='search__form'
        name='search-film'
        action='#'
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='search__wrapper'>
          <label htmlFor='search' className='search__label'>
            <input
              className='search__input'
              type='text'
              id='search'
              name='search'
              required
              placeholder='Фильм'
              {...register('search', {
                required: true,
              })}
            />
          </label>

          <button
            className='search__button'
            type='submit'
            onClick={onSubmit}
            // onClick={handleSubmit(() => handleFilterMovies(watch('search')))}
          >
            <img className='search__img' src={searchBtn} alt='Кнопка поиска' />
          </button>
        </div>
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
            checked={checkbox}
          />
          <span className='filter__visible-checkbox'>Короткометражки</span>
        </label>
      </form>
      <span className='search__error'>
        {errors.search?.type === 'required' && 'Нужно ввести ключевое слово'}
        {errors.search?.type === 'custom' && 'Ничего не найдено'}
        {errors?.root?.serverError?.type === 400 &&
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}
      </span>
    </FormProvider>
  );
}

export default SearchForm;
