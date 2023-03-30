import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const middleware = [logger, thunk];

export const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

