import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useSearchContext } from '../context/SearchContext';
import Categories from './Categories';
import styles from '../styles/Meals.module.css';
import drinkIcon from '../images/drinkIcon.svg';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  // const { results } = useSearchContext();

  useEffect(
    () => {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setDrinks(data.drinks));
    },
    [],
  );

  const updateDrinks = (newDrinks) => {
    setDrinks(newDrinks);
  };

  const maxRecipes = 12;

  return (
    <div className={ `${styles.meals__container} main-content` }>
      <div className={ styles.logo__container }>
        <img
          src={ drinkIcon }
          alt="logo-drinks"
          className="logo-drinks"
          style={ { width: '80px' } }
        />
        <h1>Drinks</h1>
        <Categories
          category="drinks"
          updateRecipes={ updateDrinks }
        />

        <ul>
          {drinks
            .slice(0, maxRecipes).map((drink, index) => (
              <Link
                to={ `/drinks/${drink.idDrink}` }
                key={ drink.idDrink }
              >
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
              </Link>
            ))}
          {/* {console.log(drinks)} */}
        </ul>
      </div>
    </div>
  );
}

export default Drinks;
