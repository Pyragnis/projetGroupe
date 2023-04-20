/*export const loginUser = (email, password) => async (dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: 'LOGIN_USER_SUCCESS' });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const logoutUser = () => async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch({ type: 'LOGOUT_USER_SUCCESS' });
    } catch (err) {
      console.log(err);
    }
  };
  */