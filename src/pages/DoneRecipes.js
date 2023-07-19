import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [linkCopied, setLinkCopied] = useState({});
  const [filter, setFilter] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  // console.log(doneRecipes);

  const timeOutInterval = 2000;
  const handleShare = (id, type) => {
    const url = `${window.location.origin}/${type}s/${id}`;
    clipboardCopy(url);
    setLinkCopied((prevState) => ({ ...prevState, [id]: true }));
    setTimeout(() => setLinkCopied((prevState) => ({
      ...prevState,
      [id]: false,
    })), timeOutInterval);
  };

  const filteredRecipes = doneRecipes
    ? doneRecipes.filter((recipe) => {
      if (filter === 'all') return true;
      return recipe.type === filter;
    })
    : [];
  return (
    <div>
      <h1>Done recipes:</h1>
      <button data-testid="filter-by-all-btn" onClick={ () => setFilter('all') }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => setFilter('meal') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => setFilter('drink') }>
        Drinks
      </button>

      {filteredRecipes.length === 0 ? (
        <p>No recipes yet</p>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <div key={ index }>

            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="done-recipe-image"
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            </Link>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>

            {recipe.tags && recipe.tags.map((tag, tagIndex) => (
              <p key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
                {tag}
              </p>
            ))}

            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>

            <button
              type="button"
              onClick={ () => handleShare(recipe.id, recipe.type) }
            >
              <img
                src={ shareIcon }
                alt="share"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>

            <button
              type="button"
              onClick={ () => handleFavorite(recipe.id, recipe.type) }
            >
              <img
                src={ blackHeartIcon }
                alt="favorite"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>

            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <button type="button">See recipe</button>
            </Link>

            <br />

            {linkCopied[recipe.id] && <span>Link copied!</span>}

          </div>
        ))
      )}
    </div>
  );
}

export default DoneRecipes;
