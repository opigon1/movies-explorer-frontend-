import myImg from '../../images/me-foto.jpg';

function AboutMe() {
  return (
    <section id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__info'>
        <div className='about-me__info-description'>
          <h3 className='about-me__name'>Степан</h3>
          <h4 className='about-me__job'>Фронтенд-разработчик, 21 год</h4>
          <p className='about-me__text'>
            Я родился и живу в Луганске, учусь на факультете информационных
            технологий ЛГУ им. В. Даля. Увлекаюсь спортом и автомобилями, люблю
            слушать музыку. После прохождение курса планирую практиковаться в
            решении алгоритмических задач и изучать новые технологии. После того
            как буду уверен в своих навыках, попробую попасть на стажировку в
            Яндекс.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/opigon1'
            target='_blank'
            rel='noreferrer'
          >
            GitHub
          </a>
        </div>
        <div className='about-me__info-image'>
          <img className='about-me__img' src={myImg} alt='Моё фото' />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
