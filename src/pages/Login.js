import React, { useEffect, useState } from 'react';

const MIN_LENGTH = 6;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const passwordCheck = password.length > MIN_LENGTH;
    if (emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <form>
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
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
      >
        Enter

      </button>
    </form>
  );
}

export default Login;
