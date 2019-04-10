import { StateType } from 'typesafe-actions';
import { Middleware } from 'redux';

import rootReducer from './root-reducer';

import { fetchLocationsMiddleware } from './locations/middleware';
import { fetchFishesMiddleware } from './fishes/middleware';
import { fetchBranchesMiddleware } from './branches/middleware';

import * as locationsSelectors from './locations/selectors';
import * as fishesSelectors from './fishes/selectors';

import * as locationsActions from './locations/actions';
import * as fishesActions from './fishes/actions';
import * as branchesActions from './branches/actions';

export { default } from './store';
export { default as rootReducer } from './root-reducer';

export const selectors = {
  fishes: fishesSelectors,
  locations: locationsSelectors
};

export const actions = {
  fishes: fishesActions,
  locations: locationsActions,
  branches: branchesActions
};

export const middlewares: Middleware[] = [
  fetchLocationsMiddleware,
  fetchFishesMiddleware,
  fetchBranchesMiddleware
]

export type RootState = StateType<typeof rootReducer>;
