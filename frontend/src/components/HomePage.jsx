import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Добро пожаловать в чат</h1>
      <p>Для входа в чат необходимо авторизоваться</p>
      <Link to="/login" className="login-link">
        Перейти к авторизации
      </Link>
    </div>
  );
};

export default HomePage;
