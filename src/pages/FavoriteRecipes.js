// Tem CSS inline <<<<<<<<<<<<<<<<<<

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [showLinkCopiedMsg, setShowLinkCopiedMsg] = useState(false);
  const [storedRecipes, setStoredRecipes] = useState([]);
  const getStoredRecipes = () => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const storedRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setStoredRecipes(storedRecipesArray);
    }
  };

  useEffect(() => {
    getStoredRecipes();
  }, []);

  const handleFavorite = (recipe) => {
    const storedRecipesArray = storedRecipes;
    let indexOfRecipeToRemove = null;
    storedRecipesArray.forEach(
      (storedRecipe, index) => {
        if (storedRecipe.id === recipe.id) indexOfRecipeToRemove = index;
      },
    );
    storedRecipesArray.splice(indexOfRecipeToRemove, 1);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(
        [
          ...storedRecipesArray,
        ],
      ),
    );
    getStoredRecipes();
  };

  return (
    <div>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Food</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {
        storedRecipes.length > 0 ? storedRecipes.map((recipe, index) => (
          <div key={ `${recipe.type}.${recipe.id}` }>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <>
                <img
                  src={ recipe.image }
                  alt="recipe"
                  data-testid={ `${index}-horizontal-image` }
                  width="40%"
                  height="40%"
                />
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </h3>
              </>
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot} - ${recipe.category}` }
            </h3>
            <button
              onClick={ () => {
                setShowLinkCopiedMsg(true);
                console.log(window.location);
                copy(`${window.location.origin}/${recipe.type}s/${recipe.id}`);
              } }
            >
              { showLinkCopiedMsg && <p>Link copied!</p> }
              <img
                src={ shareIcon }
                alt="share icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button onClick={ () => handleFavorite(recipe) }>
              <img
                src={ blackHeartIcon }
                alt="favorite icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>

          </div>
        )) : <p>No favorite recipes</p>
      }
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
