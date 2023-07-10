import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();
  const handleButtonClick = (buttonName) => {
    if (buttonName === 'Meals') {
      history.push('/meals');
    } else if (buttonName === 'Drinks') {
      history.push('/drinks');
    }
  };

  return (
    <div>
      <footer data-testid="footer">
        <p> teste de footer</p>
        <button onClick={ () => handleButtonClick('Meals') }>Meals</button>
        <button onClick={ () => handleButtonClick('Drinks') }>Drinks</button>
      </footer>
    </div>
  );
}

export default Footer;
