import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchContext } from '../context/SearchContext';

function SearchBar() {
  const [chosenRecipes, setChosenRecipes] = useState('');
  const location = useLocation();
  const {
    // searchType,
    setSearchType,
    searchInput,
    setSearchInput,
    handleSearch,
    results,
  } = useSearchContext();

  useEffect(() => {
    setChosenRecipes(location.pathname);
  }, [location, chosenRecipes]);

  useEffect(() => {
    if (results && results !== null && results.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [results]);

  const handleClick = ({ target }) => {
    setSearchType(target.value); // Atualiza o tipo de busca
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ (event) => setSearchInput(event.target.value) } // Atualiza o termo de busca
      />
      <br />
      <input
        type="radio"
        id="ingredients"
        value="Ingredient"
        data-testid="ingredient-search-radio"
        name="search-radio"
        onClick={ handleClick }
      />
      <label htmlFor="ingredients">Ingredient</label>
      <input
        type="radio"
        id="name"
        value="Name"
        data-testid="name-search-radio"
        name="search-radio"
        onClick={ handleClick }
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio"
        id="first-letter"
        value="First letter"
        data-testid="first-letter-search-radio"
        name="search-radio"
        onClick={ handleClick }
      />
      <label htmlFor="first-letter">First letter</label>
      <br />
      <button
        data-testid="exec-search-btn"
        onClick={ handleSearch } // Executa a busca ao clicar no botão
      >
        Procurar
      </button>
    </div>
  );
}

export default SearchBar;
