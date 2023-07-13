import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
//   const [favoriteIcon, setFavoriteIcon] = useState(true);
  const [showLinkCopiedMsg, setShowLinkCopiedMsg] = useState(false);
  const handleFavorite = () => {};
  const getStoredRecipes = () => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const storedRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      return storedRecipesArray;
    }
    return [];
  };
  const storedRecipes = getStoredRecipes();

  return (
    <div>
      <h1>FAVORITES</h1>
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
              to={ `/${recipe.type}/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                alt="recipe"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </h3>
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
            <button onClick={ handleFavorite }>
              <img
                src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon } // favoriteIcon tá comentado logo no início do componente
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
