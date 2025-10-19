import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          {t('header.title')}
        </Link>
        
        {user && (
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            {t('header.logout')}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
