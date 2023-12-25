import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <main className='login'>
      <img className='login__logo' src={logo} alt='Логотип' />
      <h1 className='login__title'>Рады видеть!</h1>
      <form action='#' className='login__form' name='login' noValidate>
        <label className='login__label' htmlFor='email'>
          E-mail
          <input
            className='login__input'
            type='email'
            id='email'
            name='email'
            required
          />
          <span className='login__error'>Что-то пошло не так...</span>
        </label>
        <label className='login__label' htmlFor='password'>
          Пароль
          <input
            className='login__input'
            type='password'
            id='password'
            name='password'
            required
          />
          <span className='login__error'>Что-то пошло не так...</span>
        </label>
      </form>
      <button className='login__submit' type='submit'>
        Войти
      </button>
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
