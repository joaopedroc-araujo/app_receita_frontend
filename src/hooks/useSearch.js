import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const useSearch = () => {
  const [searchType, setSearchType] = useState('Ingredient');
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [chosenRecipes, setChosenRecipes] = useState('');
  const location = useLocation();
  const history = useHistory();

  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

  useEffect(() => {
    setChosenRecipes(location.pathname);
  }, [location]);

  // useEffect(() => {
  //   if (results && results !== null && results.length === 0) {
  //     global.alert('Sorry, we haven\'t found any recipes for these filters.');
  //   }
  // }, [results]);

  useEffect(() => {
    if (results && results.length === 1) {
      if (chosenRecipes.includes('/meals')) {
        history.push(`/meals/${results[0].idMeal}`);
      } else if (chosenRecipes.includes('/drinks')) {
        history.push(`/drinks/${results[0].idDrink}`);
      }
    }
  }, [results, history, chosenRecipes]);

  const getMealsEndpoint = () => {
    let endpoint;
    if (searchType === 'Ingredient') {
      endpoint = `${mealsURL}filter.php?i=${searchInput}`;
    } else if (searchType === 'Name') {
      endpoint = `${mealsURL}search.php?s=${searchInput}`;
    } else if (searchType === 'First letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      endpoint = `${mealsURL}search.php?f=${searchInput}`;
    }
    // console.log(endpoint);
    return endpoint;
  };

  const getDrinksEndpoint = () => {
    let endpoint;
    if (searchType === 'Ingredient') {
      endpoint = `${drinksURL}filter.php?i=${searchInput}`;
    } else if (searchType === 'Name') {
      endpoint = `${drinksURL}search.php?s=${searchInput}`;
    } else if (searchType === 'First letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      endpoint = `${drinksURL}search.php?f=${searchInput}`;
    }
    return endpoint;
  };

  const getEndpoint = () => {
    let endpoint;
    let dataKey;
    if (location.pathname.includes('/meals')) {
      dataKey = 'meals';
      endpoint = getMealsEndpoint();
    } else if (location.pathname.includes('/drinks')) {
      dataKey = 'drinks';
      endpoint = getDrinksEndpoint();
    }
    return { endpoint, dataKey };
  };

  const handleSearch = async () => {
    const { endpoint, dataKey } = getEndpoint();
    const response = await fetch(endpoint);
    const data = await response.json();
    setResults(data[dataKey] || []);
    // if (results && results !== null && results.length === 0) {
    //   return (
    //     <NoRecipes />
    //   );
    // }
  };

  return {
    searchType,
    setSearchType,
    searchInput,
    setSearchInput,
    results,
    handleSearch,
  };
};

export default useSearch;
