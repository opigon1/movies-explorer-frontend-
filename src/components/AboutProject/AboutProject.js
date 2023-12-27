function AboutProject() {
  return (
    <section id='about'>
      <h2 className='about__title'>О проекте</h2>
      <ul className='about__description-list'>
        <li className='about__description-item'>
          <h3 className='about__description-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about__description-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='about__description-item'>
          <h3 className='about__description-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about__progress'>
        <div className='about__progress-backend'>
          <p className='about__progress-time about__progress-time_type_backend'>
            1 неделя
          </p>
          <p className='about__progress-name'>Back-end</p>
        </div>
        <div className='about__progress-frontend'>
          <p className='about__progress-time about__progress-time_type_frontend'>
            4 недели
          </p>
          <p className='about__progress-name'>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
