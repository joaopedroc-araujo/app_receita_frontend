import { useState, useEffect } from 'react';
import useRecomendFetch from '../hooks/useRecomendFetch';

function Recomended() {
  const [recomendations, setRecomendations] = useState(null);
  const data = useRecomendFetch();

  useEffect(() => {
    if (data) {
      const maxRecomends = 6;
      setRecomendations(data.slice(0, maxRecomends));
    }
  }, [data]);

  if (!recomendations) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {recomendations.map((item, index) => (
          <li key={ index }>{item.strMeal || item.strDrink}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recomended;
