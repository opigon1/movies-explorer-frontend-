import arrowImg from '../../images/text__COLOR_font-main.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a
            className='portfolio__link'
            href='https://github.com/opigon1/how-to-learn'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт{' '}
            <img className='portfolio__img' src={arrowImg} alt='ссылка' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://github.com/opigon1/russian-travel'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт{' '}
            <img className='portfolio__img' src={arrowImg} alt='ссылка' />
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            href='https://github.com/opigon1/mesto-react-authorization'
            className='portfolio__link'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение{' '}
            <img className='portfolio__img' src={arrowImg} alt='ссылка' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
