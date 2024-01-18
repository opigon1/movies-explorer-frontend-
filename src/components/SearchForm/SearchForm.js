import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import searchBtn from '../../images/search-btn.svg';
import { BAD_REQUEST } from '../../utils/constants';

function SearchForm({ submitHandler, checkbox, setCheckbox, lastSearchQuery }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    methods,
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
  } = useForm({
    mode: 'onSubmit',
  });

  React.useEffect(() => {
    setValue('search', lastSearchQuery);
  }, [setValue, lastSearchQuery]);

  const onClickCheckbox = () => setCheckbox(!checkbox);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await submitHandler(checkbox, watch('search'));
    } catch (err) {
      console.error(err);
      if (err === BAD_REQUEST) {
        setError('root.serverError', {
          type: err,
        });
      }
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
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
        <span className='search__error'>
          {errors.search?.type === 'required' && 'Нужно ввести ключевое слово'}
          {errors?.root?.serverError?.type === BAD_REQUEST &&
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'}
        </span>
      </form>
    </FormProvider>
  );
}

export default SearchForm;
