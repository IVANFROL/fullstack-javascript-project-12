import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="home-page">
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
      <div className="home-links">
        <Link to="/login" className="login-link" data-testid="login-link">
          {t('auth.login')}
        </Link>
        <Link to="/signup" className="signup-link" data-testid="signup-link">
          {t('auth.signup')}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
