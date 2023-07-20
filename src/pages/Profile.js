import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../styles/Meals.module.css';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userObject = JSON.parse(localStorage.getItem('user'));
    if (userObject) {
      setEmail(userObject.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <div className={ `${styles.meals__container} main-content` }>
      <div className={ styles.logo__container }>
        <img src={ profileIcon } alt="logo-meals" />
        <h1>Profile</h1>
      </div>
      <h3 data-testid="profile-email">{email}</h3>
      <div>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn">
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button data-testid="profile-favorite-btn">
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogout }
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
