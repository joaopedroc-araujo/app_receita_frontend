import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import recipesReducer from '../reducers/recipesReducer';

const store = createStore(recipesReducer, applyMiddleware(thunk));

export default store;
