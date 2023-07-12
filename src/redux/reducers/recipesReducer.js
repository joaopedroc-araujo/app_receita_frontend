const initialState = {
  recipes: [],
  categories: [],
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_RECIPES_BY_CATEGORY':
    return {
      ...state,
      recipes: action.payload,
    };
  case 'FETCH_CATEGORIES':
    return {
      ...state,
      categories: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
