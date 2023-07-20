import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import recipesReducer from '../reducers/recipesReducer';

const store = createStore(recipesReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
