import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import SearchBar from './SearchBar';
import logo from '../images/logo.svg';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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

  const handleClick = (event) => {
    event.preventDefault();
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header>
      <div className={ styles.title__container }>
        <img src={ logo } alt="logo" />
        <h1 data-testid="page-title">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className={ styles.header__btns }>
        {showSearchIcon && (
          <button
            type="button"
            onClick={ handleClick }
          >
            <img
              src={ searchIcon }
              alt="Search"
              data-testid="search-top-btn"
            />
          </button>
        )}
        <Link to="/profile">
          <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
        </Link>
      </div>
      {isSearchVisible && <SearchBar />}
    </header>
  );
}

export default Header;
