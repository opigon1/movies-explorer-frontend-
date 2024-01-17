import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import logo from '../../images/logo.svg';
import React from 'react';
import { authorize } from '../../utils/auth';

function Login({ onLogin }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    methods,
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm({ mode: 'all' });

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    authorize(data)
      .then(() => {
        onLogin();
      })
      .catch((err) => {
        console.error(err);
        if (err === 'Ошибка 401') {
          setError('root.serverError', {
            type: err,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  return (
    <main className='login'>
      <Link to={'/'}>
        <img className='login__logo' src={logo} alt='Логотип' />
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>
      <FormProvider {...methods}>
        <form
          action='#'
          className='login__form'
          name='login'
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <label className='login__label' htmlFor='email'>
            E-mail
            <input
              className='login__input'
              type='email'
              id='email'
              name='email'
              required
              {...register('email', {
                required: true,
                pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              })}
            />
            <span className='login__error'>
              {errors.email?.type === 'required' && 'Это поле обязательное'}
              {errors.email?.type === 'pattern' && 'Неверный формат Email'}
              {errors?.root?.serverError?.type === 'Ошибка 401' &&
                'Передан неккоректный email.'}
            </span>
          </label>
          <label className='login__label' htmlFor='password'>
            Пароль
            <input
              className='login__input'
              type='password'
              id='password'
              name='password'
              required
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
            className='login__submit'
            type='submit'
            onClick={onSubmit}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </FormProvider>
      <p className='login__text'>
        Ещё не зарегистрированы?
        <Link to='/signup' className='login__link'>
          Регистрация
        </Link>
      </p>
    </main>
  );
}

export default Login;
