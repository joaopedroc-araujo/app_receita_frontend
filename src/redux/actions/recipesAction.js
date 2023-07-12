const SET_MEALS = 'SET_MEALS';
const SET_DRINKS = 'SET_DRINKS';

const setMeals = (meals) => ({
  type: SET_MEALS,
  payload: meals,
});

const setDrinks = (drinks) => ({
  type: SET_DRINKS,
  payload: drinks,
});

const fetchMeals = () => (dispatch) => {
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => dispatch(setMeals(data.meals)));
};

const fetchDrinks = () => (dispatch) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((response) => response.json())
    .then((data) => dispatch(setDrinks(data.drinks)));
};

if (route === 'meals') {
  dispatch(fetchMeals());
} else if (route === 'drinks') {
  dispatch(fetchDrinks());
}
