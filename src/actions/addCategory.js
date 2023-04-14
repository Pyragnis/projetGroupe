import { db } from '../config/FirebaseConfig';

export const ADD_CATEGORY = 'ADD_CATEGORY';

export const addCategory = (categoryName) => {
  return async (dispatch) => {
    try {
      const categoriesRef = db.collection('categories');
      const newCategoryRef = await categoriesRef.add({ name: categoryName });
      dispatch({ type: ADD_CATEGORY, payload: { id: newCategoryRef.id, name: categoryName } });
    } catch (error) {
      console.log(error);
    }
  };
};
