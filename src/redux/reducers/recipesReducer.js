const initialState = [{
  recipes: [{
    drinks: [],
    meals: [],
    categories: [],
  },
  ],
  email: '',
}];

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_MEALS:
    return {
      ...state,
      recipes: {
        ...state.recipes,
        meals: action.payload,
      },
    };
  case SET_DRINKS:
    return {
      ...state,
      recipes: {
        ...state.recipes,
        drinks: action.payload,
      },
    };
  case SET_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
