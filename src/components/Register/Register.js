import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <main className='register'>
      <img className='register__logo' src={logo} alt='Логотип' />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form action='#' className='register__form' name='register' noValidate>
        <label className='register__label' htmlFor='name'>
          Имя
          <input
            className='register__input'
            type='text'
            id='name'
            name='name'
            required
          />
          <span className='register__error'>Что-то пошло не так...</span>
        </label>

        <label className='register__label' htmlFor='email'>
          E-mail
          <input
            className='register__input'
            type='email'
            id='email'
            name='email'
            required
          />
          <span className='register__error'>Что-то пошло не так...</span>
        </label>
        <label className='register__label' htmlFor='password'>
          Пароль
          <input
            className='register__input'
            type='password'
            id='password'
            name='password'
            required
          />
          <span className='register__error'>Что-то пошло не так...</span>
        </label>
      </form>
      <button className='register__submit' type='submit'>
        Зарегистрироваться
      </button>
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
