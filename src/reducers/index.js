import { combineReducers } from 'redux';
import counter from './counter';
import categoryReducer from './categoryReducer';

export default combineReducers({
  counter,
  categoryReducer,
});
