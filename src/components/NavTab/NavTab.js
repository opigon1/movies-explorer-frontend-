function NavTab() {
  return (
    <section className='navtab'>
      <ul className='navtab__list'>
        <li className='navtab__list-item'>
          <a className='navtab__list-link' href='#about'>
            О проекте
          </a>
        </li>
        <li className='navtab__list-item'>
          <a className='navtab__list-link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='navtab__list-item'>
          <a className='navtab__list-link' href='#about-me'>
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;
