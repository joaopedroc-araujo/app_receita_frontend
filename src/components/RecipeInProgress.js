import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import style from '../styles/RecipeInProgress.module.css';
import useLocalStorage from '../hooks/useLocalStorage3';
import { doneRecipeObject, favoriteRecipeObject } from '../utils/functions';

const placeholder = 'https://via.placeholder.com/360x161?text=Recipe%20Thumb';
const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const copy = require('clipboard-copy');

function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [progress, setProgress] = useLocalStorage('inProgressRecipes', {});
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const [showLinkCopiedMsg, setShowLinkCopiedMsg] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  // faz a requisicao da receita e salva no estado; verifica se a receita é favorita
  useEffect(() => {
    const { pathname } = window.location;
    const url = pathname.includes('meals') ? URL_MEALS : URL_DRINKS;
    const fetchRecipe = async () => {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      if (data.meals) {
        setRecipe(data.meals[0]);
      } else if (data.drinks) {
        setRecipe(data.drinks[0]);
      }
    };
    fetchRecipe();
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const storedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorited = storedRecipes.some(
        (storedRecipe) => storedRecipe.id === id,
      );
      if (isFavorited) {
        setFavoriteIcon(true);
      } else {
        setFavoriteIcon(false);
      }
    }
  }, [id]);
  // Função que controla o estado de favorito
  const handleFavorite = () => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      if (!favoriteIcon) {
        const storedRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storedRecipesArray, favoriteRecipeObject(recipe)]),
        );
        setFavoriteIcon(true);
      } else {
        const storedRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
        // storedRecipesArray.indexOf(colunaOperadorValor.coluna);
        const indexOfRecipeToRemove = storedRecipesArray.find(
          (storedRecipe, index) => (storedRecipe.id === recipe.id ? index : false),
        );
        storedRecipesArray.splice(indexOfRecipeToRemove, 1);
        localStorage.setItem('favoriteRecipes', JSON.stringify([...storedRecipesArray]));
        setFavoriteIcon(false);
      }
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(
          [
            favoriteRecipeObject(recipe),
          ],
        ),
      );
      setFavoriteIcon(true);
    }
  };
  // salva o estado checkedIngredients no localStorage
  useEffect(() => {
    if (recipe.idMeal || recipe.idDrink) {
      // setProgress((prevState) => ({
      //   ...prevState,
      //   [recipe.idMeal || recipe.idDrink]: checkedIngredients,
      // }));
      setProgress({ ...progress, [recipe.idMeal || recipe.idDrink]: checkedIngredients });
    }
  }, [checkedIngredients, recipe, setProgress]);

  // função que controla o estado de checkedIngredients
  const getValue = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedIngredients([...checkedIngredients, value]);
    } else {
      setCheckedIngredients(checkedIngredients.filter((item) => item !== value));
    }
  };

  const handleCheckedIngredients = (ingredient) => {
    if (progress[id]) {
      return progress[id].includes(ingredient);
    }
  };

  const handleChecked = () => {
    const totalOfIngredients = Object.keys(recipe)
      .filter(
        (key) => key.includes('Ingredient' || 'Measure'),
      )
      .filter(
        (ingredient) => recipe[ingredient] !== ''
          && recipe[ingredient] !== null,
      )
      .map((ingredient) => ingredient).length;
    // console.log(totalOfIngredients);
    return totalOfIngredients === checkedIngredients.length;
  };

  const handleFinishBtn = () => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(doneRecipes);
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, doneRecipeObject(recipe)]),
      );
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipeObject(recipe)]));
    }
    history.push('/done-recipes');
  };
  // console.log(checkedIngredients);
  // console.log(progress);
  // console.log(recipe);
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
          onClick={ () => {
            setShowLinkCopiedMsg(true);
            copy(`${window.location.origin}/${recipe.idDrink
              ? 'drinks'
              : 'meals'}/${recipe.idDrink || recipe.idMeal}`);
          } }
        >
          <img data-testid="share-btn" src={ shareIcon } alt="share-icon" />
        </button>
        { showLinkCopiedMsg && <p>Link copied!</p> }
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
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
                  checkedIngredients.includes(recipe[ingredient])
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : {}
                }
              >
                <li>
                  <input
                    type="checkbox"
                    checked={ handleCheckedIngredients(recipe[ingredient]) }
                    value={ recipe[ingredient] }
                    onChange={ (event) => getValue(event) }
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
        <Link to="/done-recipes">
          <button
            className={ style.finishRecipes }
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !handleChecked() }
            onClick={ handleFinishBtn }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </main>
  );
}
export default RecipeInProgress;
