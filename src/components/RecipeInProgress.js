import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import style from '../styles/RecipeInProgress.module.css';

const placeholder = 'https://via.placeholder.com/360x161?text=Recipe%20Thumb';
const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function RecipeInProgress() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const { pathname } = window.location;
    const id = pathname.split('/')[2];
    const url = pathname.includes('meals') ? URL_MEALS : URL_DRINKS;
    const fetchRecipe = async () => {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      setRecipe(data.meals ? data.meals[0] : data.drinks[0]);
    };
    fetchRecipe();
  }, []);

  const toggleFavorite = (event) => {
    event.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const handleIngredientToggle = (index) => {
    const newCheckedIngredients = [...checkedIngredients];
    newCheckedIngredients[index] = !newCheckedIngredients[index];
    setCheckedIngredients(newCheckedIngredients);
  };

  return (
    <main>
      <div className={ style.imageRecipe }>
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb || placeholder }
          alt="recipe-name"
          data-testid="recipe-photo"
        />
      </div>
      <section className={ style.actionButtons }>
        <button
          type="button"
          data-testid="share-btn"
          alt="share-icon"
        >
          <img src={ shareIcon } alt="share-icon" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          alt="share-icon"
          onClick={ toggleFavorite }
        >
          <img
            src={ isFavorite
              ? blackHeartIcon
              : whiteHeartIcon }
            alt="favorite-icon"
          />
        </button>
      </section>
      <h1
        className={ style.title }
        data-testid="recipe-title"
      >
        { recipe.strMeal || recipe.strDrink }

      </h1>
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      <div className={ style.instructions__container }>
        <h3>Ingredients</h3>
        <ul>
          {Object.keys(recipe)
            .filter(
              (key) => key.includes('Ingredient' || 'Measure'),
            )
            .filter(
              (ingredient) => recipe[ingredient] !== ''
                && recipe[ingredient] !== null,
            )
            .map((ingredient, index) => (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                style={
                  checkedIngredients[index]
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : {}
                }
              >
                <li>
                  <input
                    type="checkbox"
                    onChange={ () => handleIngredientToggle(index) }
                  />
                  {' '}
                  {`${recipe[ingredient]}`}
                </li>

              </label>
            ))}
        </ul>
        <h3>Instructions</h3>
        <p
          data-testid="instructions"
        >
          {recipe.strInstructions}
        </p>
        <button
          className={ style.finishRecipes }
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
    </main>

  );
}

export default RecipeInProgress;
