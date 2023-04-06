import { combineReducers } from 'redux';
import counter from './counter';
import categoryReducer from './categoryReducer';
import scannerReducer from './scanner';

export default combineReducers({
  counter,
  categoryReducer,
  scannerReducer,
});
