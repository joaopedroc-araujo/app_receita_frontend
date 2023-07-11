import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
    <div className="container overflow-auto">
      <h1>Meals</h1>
      <Categories
        category="meals"
        updateRecipes={ updateDrinks }
      />
      <ul>
        {meals.slice(0, maxRecipes).map((meal, index) => (
          <li
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/meals/${meal.idMeal}` }>
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Meals;
