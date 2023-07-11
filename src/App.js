import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
// import Profile from './pages/Profile';
// import Favorites from './pages/Favorites';

function App() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        component={ Login }
      />
      <Route
        path="/meals"
        render={ () => (
          <>
            <Header />
            <Meals />
          </>
        ) }
      />
      <Route
        path="/drinks"
        render={ () => (
          <>
            <Header />
            <Drinks />
          </>
        ) }
      />
      <Route path="/meals:id-da-receita" component={ Meals } />
      <Route path="/drinks:id-da-receita" component={ Drinks } />
      <Route path="/meals:id-da-receita/in-progress" component={ Meals } />
      <Route path="/drinks:id-da-receita/in-progress" component={ Drinks } />
      <Route
        path="/profile"
        render={ () => (
          <Header />
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
  );
}

export default App;
