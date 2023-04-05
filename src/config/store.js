import { applyMiddleware, createStore,combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categoryReducer from '../reducers/categoryReducer';

const middleware = [logger, thunk];

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);
export const persistor = persistStore(store);
