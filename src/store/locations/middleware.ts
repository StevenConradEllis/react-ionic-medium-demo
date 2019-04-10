import * as locations from './actions';
import { Location, LocationState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchLocationsMiddleware: Middleware<{}, LocationState> = ({ getState }) => next => async (action: ActionType<typeof locations>) => {
  next(action);

  if (action.type != getType(locations.updateLocations)) {
    return;
  }

  next(locations.fetchLocations.request());
  try {
    const response = await fetch('/data/locations.json');
    const locationsList: Location[] = await response.json();

    next(locations.fetchLocations.success(locationsList));
  } catch (e) {
    next(locations.fetchLocations.failure(e));
  }
};
