import { ADD_NOTIFICATION, CLEAR_NOTIFICATIONS } from './actions';

const initialState = {
  notifications: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

export default reducer;
