export const favoriteRecipeObject = (recipeObj) => {
  console.log(recipeObj);
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

export const doneRecipeObject = (recipeObj) => {
  if (recipeObj.idMeal) {
    console.log(recipeObj);
    const mealObject = {
      id: recipeObj.idMeal,
      type: 'meal',
      nationality: recipeObj.strArea,
      category: recipeObj.strCategory,
      alcoholicOrNot: '',
      name: recipeObj.strMeal,
      image: recipeObj.strMealThumb,
      doneDate: new Date().toISOString(),
      tags: recipeObj.strTags ? recipeObj.strTags.split(',') : [],
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
    doneDate: new Date().toISOString(),
    tags: recipeObj.strTags ? recipeObj.strTags.split(',') : [],
  };
  return drinkObject;
};
