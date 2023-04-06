const themeReducer = (state = 'system', action) => {
    switch (action.type) {
      case 'SET_THEME':
        return action.payload;
      default:
        return state;
    }
  };
  