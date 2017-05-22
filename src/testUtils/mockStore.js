import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Default middlewares used in the application
const defaultMiddlewares = [thunk];
// Function to generate a mock store object
const generateMockStore = configureStore(defaultMiddlewares);

// Export a wrapper around generateMockStore to allow for a default store
// object.
export default (store = {}) => generateMockStore(store);
