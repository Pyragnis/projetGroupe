import { firebase } from '../config/FirebaseConfig';

export const ADD_CATEGORY = 'ADD_CATEGORY';

export const addCategory = (categoryName) => {
  return async (dispatch) => {
    try {
      const categoriesRef = firebase.firestore().collection('categories');
      const newCategoryRef = await categoriesRef.add({ name: categoryName, books: [] }); // Ajoute un tableau vide pour les livres
      dispatch({ type: ADD_CATEGORY, payload: { id: newCategoryRef.id, name: categoryName, books: [] } });
    } catch (error) {
      console.log(error);
    }
  };
};
