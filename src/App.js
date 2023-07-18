import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Footer from './components/Footer';
import Drinks from './components/Drinks';
import Meals from './components/Meals';

import RecipeInProgress from './components/RecipeInProgress';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route
          path="/meals"
          exact
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
          exact
          render={ () => (
            <>
              <Header />
              <Drinks />
              <Footer />
            </>
          ) }
        />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route
          path="/meals/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/drinks/:id/in-progress"
          component={ RecipeInProgress }
        />
        <Route
          path="/profile"
          render={ () => (
            <>
              <Header />
              <Profile />
              <Footer />
            </>
          ) }
        />
        <Route
          path="/done-recipes"
          render={ () => (
            <Header />
          ) }
        />
        <Route
          path="/favorite-recipes"
          render={ () => (
            <FavoriteRecipes />
          ) }
        />
      </Switch>

    </div>

  );
}

export default App;
