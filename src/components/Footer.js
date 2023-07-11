import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const handleButtonClick = (buttonName) => {
    if (buttonName === 'Meals') {
      history.push('/meals');
    } else if (buttonName === 'Drinks') {
      history.push('/drinks');
    }
  };

  return (
    <div>
      <footer
        data-testid="footer"
        style={ { marginTop: 'auto' } }
      >
        <Link to="/drinks">
          <button onClick={ () => handleButtonClick('Meals') }>
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="drink icon"
            />
          </button>
        </Link>
        <Link to="/meals">
          <button onClick={ () => handleButtonClick('Drinks') }>
            <img
              data-testid="meals-bottom-btn"
              src={ mealIcon }
              alt="meal icon"
            />
          </button>
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
