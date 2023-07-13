import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from '../styles/Meals.module.css';
import mealIcon from '../images/mealIcon.svg';
import Categories from './Categories';

function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(
    () => {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setMeals(data.meals));
    },
    [],
  );

  const updateDrinks = (newDrinks) => {
    setMeals(newDrinks);
  };

  const maxRecipes = 12;

  return (
    <div className={ styles.meals__container }>
      <div className={ styles.logo__container }>
        <img src={ mealIcon } alt="logo-meals" />
        <h1>Meals</h1>
      </div>
      <Categories
        category="meals"
        updateRecipes={ updateDrinks }
      />
      <ul>
        {meals.slice(0, maxRecipes).map((meal, index) => (
          <Link
            to={ `/meals/${meal.idMeal}` }
            key={ meal.idMeal }
          >
            <li
              key={ meal.idMeal }
              data-testid={ `${index}-recipe-card` }
            >

              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h3
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}
              </h3>

            </li>
          </Link>
        ))}
        {console.log(meals)}
      </ul>
    </div>
  );
}

export default Meals;
