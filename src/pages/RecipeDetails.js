import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Recomended from '../components/Recomended';

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const match = useRouteMatch('/meals/:id');
  const isMeal = match !== null;
  const history = useHistory();

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

  if (!recipe) {
    return <div>Loading...</div>;
  }
  console.log(recipe);
  return (
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
          width="560"
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
    </div>
  );
}

export default RecipeDetails;
