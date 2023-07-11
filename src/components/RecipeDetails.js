import { useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

function RecipeDetails() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const match = useRouteMatch('/meals/:id');
  const isMeal = match !== null;

  useEffect(() => {
    // Faz um fetch de acordo com qual rota está sendo acessada
    const fetchRecipe = async () => {
      let response;
      // Checa se a rota é de comidas ou bebidas
      if (isMeal) {
        response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
      } else {
        response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
      }
      const data = await response.json();
      // Seta o estado de acordo com o resultado do fetch
      setRecipe(data.meals ? data.meals[0] : data.drinks[0]);
    };

    fetchRecipe();
  }, [id, isMeal]);

  if (!recipe) {
    return <div>Loading...</div>;
  }
  console.log(recipe);
  return (
    <div>
      <h1>Recipe Details</h1>
      <h2>{recipe.strMeal || recipe.strDrink}</h2>
      <img src={ recipe.strMealThumb || recipe.strDrinkThumb } alt="recipe" />
      <h3>Ingredients</h3>
      <ul>
        {Object.keys(recipe).filter((key) => key.includes('Ingredient'))
          .filter((ingredient) => recipe[ingredient]
          !== '' && recipe[ingredient] !== null)
          .map((ingredient, index) => (
            <li key={ index }>{recipe[ingredient]}</li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
