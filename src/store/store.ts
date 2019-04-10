import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { fetchLocationsMiddleware } from './locations/middleware';
import { fetchFishesMiddleware } from './fishes/middleware';
import { fetchBranchesMiddleware } from './branches/middleware';

import rootReducer from './root-reducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares: Middleware[] = [
  fetchLocationsMiddleware,
  fetchFishesMiddleware,
  fetchBranchesMiddleware
];

function configureStore(initialState?: {}) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
