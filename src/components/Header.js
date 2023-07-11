import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

import logo from '../images/logo.svg';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const location = useLocation();
  const showSearchIcon = ['/meals', '/drinks'].includes(location.pathname);

  const getPageTitle = (pathname) => {
    switch (pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };

  return (
    <header>
      <div className="title-container">
        <img src={ logo } alt="logo" />
        <h2 data-testid="page-title">
          {getPageTitle(location.pathname)}
        </h2>
      </div>

      <div className="header-btns">
        {showSearchIcon && (
          <Link to="/search">
            <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
          </Link>
        )}
        <Link to="/profile">
          <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
