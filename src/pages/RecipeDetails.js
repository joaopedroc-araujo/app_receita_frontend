import { useEffect, useState } from 'react';
import { useParams, useRouteMatch, Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Recomended from '../components/Recomended';

const copy = require('clipboard-copy');

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const match = useRouteMatch('/meals/:id');
  const isMeal = match !== null;
  const history = useHistory();
  const [showLinkCopiedMsg, setShowLinkCopiedMsg] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

  useEffect(() => {
    // Faz um fetch de acordo com qual rota está sendo acessada
    const fetchRecipe = async () => {
      let response;
      // Checa se a rota é de comidas ou bebidas
      if (isMeal) {
        response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        history.push(`/meals/${id}`);
      } else {
        response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        history.push(`/drinks/${id}`);
      }
      const data = await response.json();
      // Seta o estado de acordo com o resultado do fetch
      setRecipe(data.meals ? data.meals[0] : data.drinks[0]);
    };

    fetchRecipe();
  }, [history, id, isMeal]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const storedRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = storedRecipes.some(
        (storedRecipe) => storedRecipe.id === id,
      );
      if (isFavorite) {
        setFavoriteIcon(true);
      } else {
        setFavoriteIcon(false);
      }
    }
  }, [id]);

  const recipeObject = (recipeObj) => {
    if (recipeObj.idMeal) {
      const mealObject = {
        id: recipeObj.idMeal,
        type: 'meal',
        nationality: recipeObj.strArea,
        category: recipeObj.strCategory,
        alcoholicOrNot: '',
        name: recipeObj.strMeal,
        image: recipeObj.strMealThumb,
      };
      return mealObject;
    }
    const drinkObject = {
      id: recipeObj.idDrink,
      type: 'drink',
      nationality: '',
      category: recipeObj.strCategory,
      alcoholicOrNot: recipeObj.strAlcoholic,
      name: recipeObj.strDrink,
      image: recipeObj.strDrinkThumb,
    };
    return drinkObject;
  };

  const handleFavorite = () => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      if (!favoriteIcon) {
        const storedRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(
            [...storedRecipesArray,
              recipeObject(recipe),
            ],
          ),
        );
        setFavoriteIcon(true);
      } else {
        const storedRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));

        // storedRecipesArray.indexOf(colunaOperadorValor.coluna);
        const indexOfRecipeToRemove = storedRecipesArray.find(
          (storedRecipe, index) => (storedRecipe.id === recipe.id ? index : false),
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
        setFavoriteIcon(false);
      }
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(
          [
            recipeObject(recipe),
          ],
        ),
      );
      setFavoriteIcon(true);
    }
  };

  const handleStartButton = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const recipeId = id;
    let buttonText = 'Start Recipe';

    if (doneRecipes && doneRecipes.some((newRecipe) => newRecipe.id === id)) {
      return (
        <Link to="/done-recipes">
          <p>Recipe already done!</p>
        </Link>
      );
    }

    if (inProgressRecipes) {
      const recipeStarted = Object.keys(inProgressRecipes).includes(recipeId);
      if (recipeStarted) {
        buttonText = 'Continue Recipe';
      }
    }

    return (
      <Link to={ isMeal ? `/meals/${id}/in-progress` : `/drinks/${id}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            display: 'block',
            bottom: '0',
            backgroundColor: '#FCC436',
            color: 'white',
            width: '336px',
            height: '40px',
            borderRadius: '5px',
            margin: '0 auto',
            marginBottom: '15px',
          } }
        >
          {buttonText}
        </button>
      </Link>
    );
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }
  // console.log(recipe);
  return (
    <>
      <div>
        <header>
          <button
            onClick={ () => {
              setShowLinkCopiedMsg(true);
              copy(window.location.href);
            } }
          >
            <img src={ shareIcon } alt="share icon" data-testid="share-btn" />
          </button>
          { showLinkCopiedMsg && <p>Link copied!</p> }
          <button onClick={ handleFavorite }>
            <img
              src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
              data-testid="favorite-btn"
            />
          </button>
        </header>
      </div>
      <div className="recipe-details">
        <h1>Recipe Details</h1>
        <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          data-testid="recipe-photo"
          alt="recipe"
          className="recipe-detail-img"
        />
        <p data-testid="recipe-category">
          {isMeal ? recipe.strCategory : recipe.strAlcoholic}
        </p>
        <h3>Ingredients</h3>
        <ul>
          {Object.keys(recipe)
            .filter((key) => key.includes('Ingredient') && recipe[key])
            .map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${recipe[ingredient]} - ${
                  recipe[`strMeasure${index + 1}`]
                }`}
              </li>
            ))}
        </ul>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {isMeal && (
          <iframe
            width="360"
            height="315"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
           encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-testid="video"
          />
        )}

        <Recomended />
        {handleStartButton()}
      </div>
    </>
  );
}

export default RecipeDetails;
