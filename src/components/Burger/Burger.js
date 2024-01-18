import { NavLink, Link } from 'react-router-dom';

function Burger({ burgerVisible, setBurgerVisible }) {
  return (
    <>
      <div
        className={
          burgerVisible
            ? 'burger__cover burger__cover_type_active'
            : 'burger__cover'
        }
      >
        <div className={burgerVisible ? 'burger burger_type_active' : 'burger'}>
          <button
            className='burger__close-btn'
            onClick={() => setBurgerVisible(!burgerVisible)}
          ></button>
          <nav className='burger__content__nav'>
            <ul className='burger__nav-list'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `burger__list-item ${
                    isActive ? 'burger__list-item_active' : 'burger__list-item'
                  }`
                }
              >
                Главная
              </NavLink>
              <NavLink
                to='/movies'
                className={({ isActive }) =>
                  `burger__list-item ${
                    isActive ? 'burger__list-item_active' : 'burger__list-item'
                  }`
                }
              >
                Фильмы
              </NavLink>
              <NavLink
                to='/saved-movies'
                className={({ isActive }) =>
                  `burger__list-item ${
                    isActive ? 'burger__list-item_active' : 'burger__list-item'
                  }`
                }
              >
                Сохранённые фильмы
              </NavLink>
            </ul>
          </nav>
          <Link className='burger__account' to='/profile'>
            Аккаунт
          </Link>
        </div>
      </div>
    </>
  );
}

export default Burger;
