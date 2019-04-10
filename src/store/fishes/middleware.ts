import * as fishes from './actions';
import { Fish, FishState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchFishesMiddleware: Middleware<{}, FishState> = ({ getState }) => next => async (action: ActionType<typeof fishes>) => {
  next(action);

  if (action.type != getType(fishes.updateFishes)) {
    return;
  }

  next(fishes.fetchFishes.request());
  try {
    const response = await fetch('/data/fishes.json');
    const fishList: Fish[] = await response.json();
    next(fishes.fetchFishes.success(fishList));
  } catch (e) {
    next(fishes.fetchFishes.failure(e));
  }
};
