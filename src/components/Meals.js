import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchContext } from '../context/SearchContext';
import Categories from './Categories';

function Meals() {
  const [meals, setMeals] = useState([]);
  const { results } = useSearchContext();

  useEffect(
    () => {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => setMeals(data.meals));
    },
    [],
  );

  const updateMeals = (newDrinks) => {
    setMeals(newDrinks);
  };

  const maxRecipes = 12;
  // console.log(meals);
  // console.log(results);
  // console.log(url);

  return (
    <div className="container overflow-auto">
      <h1>Meals</h1>
      <Categories
        category="meals"
        updateRecipes={ updateMeals }
      />
      <ul>
        {(results.length > 0 ? results : meals)
          .slice(0, maxRecipes)
          .map((meal, index) => (
            <Link to={ `/meals/${meal.idMeal}` } key={ meal.idMeal }>
              <li key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}

export default Meals;
