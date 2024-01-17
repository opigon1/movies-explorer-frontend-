import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className='not-found'>
      <div className='not-found__error'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
      </div>
      <button className='not-found__link' onClick={() => navigate(-4)}>
        Назад
      </button>
    </section>
  );
}

export default NotFoundPage;
