import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import workerMiddleware from '../middlewares/worker';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  workerMiddleware,
  thunk,
)(createStore);

const configureStore = initialState => createStoreWithMiddleware(rootReducer, initialState);

export default configureStore;
