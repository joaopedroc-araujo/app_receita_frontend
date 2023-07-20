import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import useRecomendFetch from '../hooks/useRecomendFetch';
// import './Recomended.css';
import 'bootstrap/dist/css/bootstrap.css';

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

  // Agrupa as recomendações em pares:
  const groupedRecomendations = recomendations.reduce((result, item, index) => {
    if (index % 2 === 0) {
      result.push([item]);
    } else {
      result[result.length - 1].push(item);
    }
    return result;
  }, []);

  return (
    <div className="recomended-carousel">
      <Carousel style={ { marginBottom: '50px' } }>
        {groupedRecomendations.map((group, index) => (
          <Carousel.Item
            key={ index }
            display="flex"
          >
            <div className="d-flex justify-content-around">
              {group.map((item, itemIndex) => (
                <div
                  data-testid={ `${index * 2 + itemIndex}-recommendation-card` }
                  key={ itemIndex }
                  className="d-flex flex-column align-items-center card-item"
                >
                  <img
                    src={ item.strMealThumb || item.strDrinkThumb }
                    alt={ item.strMeal || item.strDrink }
                    className="d-block w-100"
                  />
                  <h3 data-testid={ `${index * 2 + itemIndex}-recommendation-title` }>
                    {item.strMeal || item.strDrink}
                  </h3>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Recomended;
