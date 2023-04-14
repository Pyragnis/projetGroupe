import { combineReducers } from 'redux';
import counter from './counter';
import categoryReducer from './categoryReducer';
import scannerReducer from './scanner';
import { reducerCategory } from './reducerCategory';

export default combineReducers({
  counter,
  categoryReducer,
  scannerReducer,
  reducerCategory,
});
