import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import logo from '../../images/logo.svg';
import React from 'react';
import { registerApi } from '../../utils/auth';
import { authorize } from '../../utils/auth';

function Register({ onLogin }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    methods,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm({ mode: 'all' });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      await registerApi(data);
      await authorize(data);
      onLogin();
    } catch (err) {
      console.error(err);

      if (err === 'Ошибка 409') {
        setError('root.serverError', {
          type: err,
        });
      }
    } finally {
      setIsLoading(false);
    }
  });
  return (
    <main className='register'>
      <Link to={'/'}>
        <img className='register__logo' src={logo} alt='Логотип' />
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <FormProvider {...methods}>
        <form
          action='#'
          className='register__form'
          name='register'
          onSubmit={(e) => e.preventDefault()}
        >
          <label className='register__label' htmlFor='name'>
            Имя
            <input
              className='register__input'
              type='text'
              id='name'
              name='name'
              {...register('name', {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
            />
            <span className='register__error'>
              {errors.name?.type === 'required' && 'Это поле обязательное'}
              {errors.name?.type === 'minLength' &&
                'Минимальное количество знаков - 2'}
              {errors.name?.type === 'maxLength' &&
                'Максимальное количество знаков - 30'}
            </span>
          </label>

          <label className='register__label' htmlFor='email'>
            E-mail
            <input
              className='register__input'
              type='email'
              id='email'
              name='email'
              {...register('email', {
                required: true,
                pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              })}
            />
            <span className='register__error'>
              {errors.email?.type === 'required' && 'Это поле обязательное'}
              {errors.email?.type === 'pattern' && 'Неверный формат Email'}
              {errors?.root?.serverError?.type === 'Ошибка 409' &&
                'Пользователь с таким email уже существует.'}
            </span>
          </label>
          <label className='register__label' htmlFor='password'>
            Пароль
            <input
              className='register__input'
              type='password'
              id='password'
              name='password'
              {...register('password', {
                required: true,
                minLength: 8,
              })}
            />
            <span className='register__error'>
              {errors.password?.type === 'required' && 'Это поле обязательное'}
              {errors.password?.type === 'minLength' &&
                'Минимальное количество знаков - 8'}
            </span>
          </label>
          <button
            className='register__submit'
            type='submit'
            onClick={onSubmit}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>
      </FormProvider>
      <p className='register__text'>
        Уже зарегистрированы?
        <Link to='/signin' className='register__link'>
          Войти
        </Link>
      </p>
    </main>
  );
}

export default Register;
