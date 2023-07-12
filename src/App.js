import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Drinks from './components/Drinks';
import Meals from './components/Meals';
import RecipeDetails from './components/RecipeDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
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
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/drinks:id-da-receita/in-progress" component={ Drinks } />
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
            <Header />
          ) }
        />
      </Switch>

    </div>

  );
}

export default App;
