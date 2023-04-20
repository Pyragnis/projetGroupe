import { combineReducers } from 'redux';
import counter from './counter';
import themeReducer from './theme';
import languageReducer from './language';
import authReducer from './firebaseAuth';

export default combineReducers({
  counter,
  theme: themeReducer,
  language: languageReducer,
  auth: authReducer,
});
