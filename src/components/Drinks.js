import { useState, useEffect } from 'react';
import Categories from './Categories';

function Drinks() {
  const [drinks, setDrinks] = useState([]);

  useEffect(
    () => {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setDrinks(data.drinks));
    },
    [],
  );

  const maxRecipes = 12;

  return (
    <div>
      <h1>Drinks</h1>
      <Categories category="drinks" />

      <ul>
        {drinks.slice(0, maxRecipes).map((drink, index) => (
          <li
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrinkThumb }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              {drink.strDrink}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Drinks;
