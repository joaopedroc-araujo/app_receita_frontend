import { useState } from 'react';
import { createBrowserHistory } from 'history';
import { useHistory } from 'react-router-dom/';
import pesquisa from '../images/searchIcon.svg';

function SearchBar() {
  const history = useHistory();
  const [visivel, setVisivel] = useState(false);
  const [searchtype, setSearch] = useState('ingredient');
  const [input, setInput] = useState('');

  function HandleVisivel() {
    setVisivel(!visivel);
  }

  const performDrinkSearch = async () => {
    const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`);
    const data = await resp.json();
    if (data.drinks.length === 1) {
      history.push(`/drinks/${data.drinks[0].idDrink}`);
    }
  };

  const performNameSearch = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`);
    const bebida = await response.json();
    if (bebida.drinks.length === 1) {
      history.push(`/drinks/${bebida.drinks[0].idDrink}`);
    }
  };

  const performLetterSearch = async () => {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`);
      const drink = await response.json();
      console.log(drink);
      console.log(drink.drinks.length);
      if (drink.drinks.length === 1) {
        history.push(`/drinks/${drink.drinks[0].idDrink}`);
      }
    }
  };

  const performMealSearch = async () => {
    const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`);
    const comida = await meal.json();
    if (comida.meals.length === 1) {
      history.push(`/meals/${comida.meals[0].idMeal}`);
    }
  };

  const performFoodNameSearch = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
    const food = await response.json();
    console.log(food.meals.length);
    if (food.meals.length === 1) {
      history.push(`/meals/${food.meals[0].idMeal}`);
    }
  };

  const performFoodLetterSearch = async () => {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const meal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`);
      const comida = await meal.json();
      if (comida.meals.length === 1) {
        history.push(`/meals/${comida.meals[0].idMeal}`);
      }
    }
  };

  const Search = async () => {
    const browserHistory = createBrowserHistory();
    console.log(browserHistory);
    if (browserHistory.location.pathname === '/drinks') {
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
  };

  return (
    <div>
      <button onClick={ HandleVisivel } data-testid="search-top-btn">
        <img src={ pesquisa } alt="icone de pesquisa" />
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
    </div>
  );
}

export default SearchBar;
