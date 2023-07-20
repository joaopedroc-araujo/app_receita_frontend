import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Categories.module.css';

function Categories({ category, updateRecipes }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // useEffect para pegar a lista de filtro de acordo com a categoria
  useEffect(() => {
    const fetchCategories = async () => {
      if (category === 'meals') {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        );
        const data = await response.json();
        setCategories(data.meals);
      }

      if (category === 'drinks') {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
        );
        const data = await response.json();
        setCategories(data.drinks);
      }
    };

    fetchCategories();
  }, [category]);

  // Função para buscar as receitas de acordo com a categoria
  const fetchRecipesByCategory = async (categoryName) => {
    if (category === 'meals') {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      );
      const data = await response.json();
      updateRecipes(data.meals);
    }

    if (category === 'drinks') {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryName}`,
      );
      const data = await response.json();
      updateRecipes(data.drinks);
    }
  };

  // Função para limpar os filtros e buscar todas as receitas novamente
  const fetchAllRecipes = async () => {
    if (category === 'meals') {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const data = await response.json();
      updateRecipes(data.meals);
    }

    if (category === 'drinks') {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const data = await response.json();
      updateRecipes(data.drinks);
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      fetchAllRecipes();
      setSelectedCategory(null);
    } else {
      fetchRecipesByCategory(categoryName);
      setSelectedCategory(categoryName);
    }
  };

  const maxCategories = 5;
  return (
    <div className={ styles.container__categories }>
      <h1>
        {categories.slice(0, maxCategories).map((menuCategory) => (
          <button
            key={ menuCategory.strCategory }
            data-testid={ `${menuCategory.strCategory}-category-filter` }
            onClick={ () => handleCategoryClick(menuCategory.strCategory) }
          >
            {menuCategory.strCategory}
          </button>
        ))}
        <button
          data-testid="All-category-filter"
          onClick={ () => fetchAllRecipes() }
        >
          All
        </button>
      </h1>
    </div>
  );
}

Categories.propTypes = {
  category: PropTypes.string.isRequired,
  updateRecipes: PropTypes.func.isRequired,
};

export default Categories;
