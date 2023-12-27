function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__content'>
        <span className='footer__copyright'>© 2023</span>
        <a
          className='footer__link'
          href='https://practicum.yandex.ru/'
          target='_blank'
          rel='noreferrer'
        >
          Яндекс.Практикум
        </a>
        <a
          className='footer__link'
          href='https://github.com/opigon1'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
