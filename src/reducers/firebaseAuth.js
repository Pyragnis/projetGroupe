const initialState = {
    isLoggedIn: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER_SUCCESS':
        return { ...state, isLoggedIn: true };
      case 'LOGOUT_USER_SUCCESS':
        return { ...state, isLoggedIn: false };
      default:
        return state;
    }
  };
  