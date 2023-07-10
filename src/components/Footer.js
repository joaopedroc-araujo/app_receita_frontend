import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ { marginTop: 'auto' } }
    >
      <img
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drink icon"
      />
      <img
        data-testid="meals-bottom-btn"
        src={ mealIcon }
        alt="meal icon"
      />
    </footer>
  );
}

export default Footer;
