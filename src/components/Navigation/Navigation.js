import { NavLink, Link } from 'react-router-dom';

function Navigation({ location }) {
  return (
    <nav className='nav'>
      <ul className='nav__list nav__list_visible'>
        <NavLink
          to='/movies'
          className={({ isActive }) =>
            `nav__list-item ${
              isActive
                ? 'nav__list-item_active'
                : 'nav__list-item nav__list-item_' + location
            }`
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to='/saved-movies'
          className={({ isActive }) =>
            `nav__list-item ${
              isActive
                ? 'nav__list-item_active'
                : 'nav__list-item nav__list-item_' + location
            }`
          }
        >
          Сохранённые фильмы
        </NavLink>
      </ul>
      <ul className='nav__list'>
        <li className='nav__list-item nav__list-item_type_signup'>
          <Link
            to='/signup'
            href='https://vk.com/im?sel=c115&z=audio_playlist261704167_-23'
            className='nav__list-link'
          >
            Регистрация
          </Link>
        </li>
        <li className='nav__list-item nav__list-item_type_signin'>
          <Link
            to='/signin'
            href='https://vk.com/im?sel=c115&z=audio_playlist261704167_-23'
            className='nav__list-link'
          >
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
