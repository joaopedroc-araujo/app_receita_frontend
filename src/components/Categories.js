import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Categories({ category }) {
  const [categories, setCategories] = useState([]);

  // pega a categoria de comida ou bebida e faz a requisição de acordo
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

  const maxCategories = 5;
  return (
    <div>
      <h1>
        {categories.slice(0, maxCategories).map((menuCategory) => (
          <button
            key={ menuCategory.strCategory }
            data-testid={ `${menuCategory.strCategory}-category-filter` }
          >
            {menuCategory.strCategory}
          </button>
        ))}
      </h1>
    </div>
  );
}

Categories.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Categories;
