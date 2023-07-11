import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <Switch>
        <Route path="/" exact component={ Login } />
      </Switch>
      <SearchBar></SearchBar>
    </div>
  );
}

export default App;
