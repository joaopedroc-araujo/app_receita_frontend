import { useState } from 'react';
import { useHistory } from 'react-router-dom/';

function SearchBar() {
  const history = useHistory();
  const [visivel, setVisivel] = useState(false);
  const [searchtype, setSearch] = useState('ingredient');
  const [input, setInput] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const limit = 12;
  const performDrinkSearch = async () => {
    const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`);
    const data = await resp.json();
    const fetchedDrinks = data.drinks || [];
    setDrinks(fetchedDrinks.slice(0, limit));
    if (fetchedDrinks.length === 1) {
      history.push(`/drinks/${fetchedDrinks[0].idDrink}`);
    }
  };

  const performNameSearch = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`);
    const bebida = await response.json();
    const fetchedDrinks = bebida.drinks || [];
    setDrinks(fetchedDrinks.slice(0, limit));
    if (fetchedDrinks.length === 1) {
      history.push(`/drinks/${fetchedDrinks[0].idDrink}`);
    }
  };

  const performLetterSearch = async () => {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`);
      const drink = await response.json();
      const fetchedDrinks = drink.drinks || [];
      setDrinks(fetchedDrinks.slice(0, limit));
      if (fetchedDrinks.length === 1) {
        history.push(`/drinks/${fetchedDrinks[0].idDrink}`);
      }
    }
  };

  const performMealSearch = async () => {
    const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`);
    const comida = await meal.json();
    const fetchedMeals = comida.meals || [];
    setMeals(fetchedMeals.slice(0, limit));
    if (fetchedMeals.length === 1) {
      history.push(`/meals/${fetchedMeals[0].idMeal}`);
    }
  };

  const performFoodNameSearch = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    const food = await response.json();
    const fetchedMeals = food.meals || [];
    setMeals(fetchedMeals.slice(0, limit));
    if (fetchedMeals.length === 1) {
      history.push(`/meals/${fetchedMeals[0].idMeal}`);
    }
  };

  const performFoodLetterSearch = async () => {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`);
      const comida = await meal.json();
      const fetchedMeals = comida.meals || [];
      setMeals(fetchedMeals.slice(0, limit));
      if (fetchedMeals.length === 1) {
        history.push(`/meals/${fetchedMeals[0].idMeal}`);
      }
    }
  };

  const Search = async () => {
    if (history.location.pathname === '/drinks') {
      switch (searchtype) {
      case 'ingredient':
        await performDrinkSearch();
        break;
      case 'name':
        await performNameSearch();
        break;
      case 'letter':
        await performLetterSearch();
        break;
      default:
      }
    } else {
      switch (searchtype) {
      case 'ingredient':
        await performMealSearch();
        break;
      case 'name':
        await performFoodNameSearch();
        break;
      case 'letter':
        await performFoodLetterSearch();
        break;
      default:
      }
    }

    if (meals.length === 0 && drinks.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleVisivel = () => {
    setVisivel(!visivel);
  };

  return (
    <div>
      <button onClick={ handleVisivel } data-testid="search-top-btn">
        Search
      </button>
      {visivel && (
        <div className="container-invisible">
          <input
            type="radio"
            id="Ingredient"
            data-testid="ingredient-search-radio"
            name="radio-type"
            value="ingredient"
            onClick={ (e) => setSearch(e.target.value) }
          />
          <label htmlFor="Ingredient">Ingredient</label>
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            name="radio-type"
            value="name"
            onClick={ (e) => setSearch(e.target.value) }
          />
          <label htmlFor="Name">Name</label>
          <input
            type="radio"
            id="letter"
            data-testid="first-letter-search-radio"
            value="letter"
            name="radio-type"
            onClick={ (e) => setSearch(e.target.value) }
          />
          <label htmlFor="letter">Letter</label>
          <input
            type="text"
            data-testid="search-input"
            onChange={ (e) => setInput(e.target.value) }
          />
          <button data-testid="exec-search-btn" onClick={ Search }>
            Search
          </button>
        </div>
      )}

      {meals.length > 0 && (
        <div className="meal-results">
          {meals.map((meal, index) => (
            <div
              key={ meal.idMeal }
              className="meal-item"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      )}

      {drinks.length > 0 && (
        <div className="drink-results">
          {drinks.map((drink, index) => (
            <div
              key={ drink.idDrink }
              className="drink-item"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
