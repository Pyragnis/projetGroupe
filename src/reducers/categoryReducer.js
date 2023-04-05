// reducers/categoryReducer.js
import { ADD_CATEGORY, REMOVE_CATEGORY } from '../actions/categoryActions';

const initialState = [];

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.category];
    case REMOVE_CATEGORY:
      return state.filter(category => category.id !== action.id);
    default:
      return state;
  }
};

export default categoryReducer;
