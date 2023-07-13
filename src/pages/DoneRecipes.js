import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import LinkCopied from '../components/LinkCopied';

function DoneRecipes() {
  const doneRecipes = localStorage.getItem('doneRecipes');
  const url = window.location.href;

  const handleShare = () => {
    clipboardCopy(url);
    return (<LinkCopied />);
  };

  return (
    <div>
      <h1>Done recipes:</h1>
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>
      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meals'
              ? `${recipe.area} - ${recipe.category}`
              : recipe.alcoholicOrNot}
          </p>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
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
            <button type="button">Ver Receita</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
