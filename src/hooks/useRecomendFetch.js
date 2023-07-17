import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

function useRecomendFetch() {
  const [data, setData] = useState(null);
  const match = useRouteMatch('/meals');
  const isMeal = match !== null;

  useEffect(() => {
    const fetchData = async () => {
      let response;
      if (isMeal) {
        response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        );
      } else {
        response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s=',
        );
      }
      const newData = await response.json();
      setData(newData.meals || newData.drinks);
    };

    fetchData();
  }, [isMeal]);

  return data;
}

export default useRecomendFetch;
