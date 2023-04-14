import { ADD_CATEGORY } from '../actions/addCategory';

const initialState = {
  categories: [],
};

export const reducerCategory = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, { id: action.payload.id, name: action.payload.name }] };
    default:
      return state;
  }
};
