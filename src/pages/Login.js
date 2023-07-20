import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../images/logoRecipesApp.svg';
import styles from '../styles/Login.module.css';

const MIN_LENGTH = 6;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordCheck = password.length > MIN_LENGTH;
    if (emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  // handleEmailInput = () => {
  //   setEmail(target.value);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify([...storedRecipesArray]));
  // };

  return (
    <form className={ styles.form__login }>
      <div className={ styles.login__logo }>
        <img
          src={ logo }
          alt="logo"
        />
      </div>
      <h1>Login</h1>
      <input
        placeholder="Email"
        type="email"
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        placeholder="Password"
        type="password"
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <Link to="/meals">
        <button
          type="button"
          className={ styles.email_button }
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ () => {
            localStorage.setItem('mealsToken', 1);
            localStorage.setItem('cocktailsToken', 1);
            const user = {
              email,
            };
            localStorage.setItem('user', JSON.stringify(user));
            history.push('/foods');
          } }
        >
          Enter

        </button>
      </Link>
    </form>
  );
}

export default Login;
