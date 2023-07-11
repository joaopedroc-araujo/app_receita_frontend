import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
// import Recipes from './pages/Recipes';
import Footer from './components/Footer';
import Drinks from './components/Drinks';
import Meals from './components/Meals';
import Header from './components/Header';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route
          path="/meals"
          render={ () => (
            <>
              <Header />
              <Meals />
              <Footer />
            </>
          ) }
        />
        <Route
          path="/drinks"
          render={ () => (
            <>
              <Header />
              <Drinks />
              <Footer />
            </>
          ) }
        />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
      </Switch>
    </div>

  );
}

export default App;
