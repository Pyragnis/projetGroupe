// actions/categoryActions.js
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    category
  };
};

export const removeCategory = (id) => {
  return {
    type: REMOVE_CATEGORY,
    id
  };
};
