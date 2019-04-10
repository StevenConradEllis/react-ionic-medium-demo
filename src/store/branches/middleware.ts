import * as locations from './actions';
import { Branch, BranchState } from './types';
import { ActionType, getType } from 'typesafe-actions';
import { Middleware } from 'redux';

export const fetchBranchesMiddleware: Middleware<{}, BranchState> = ({ getState }) => next => async (action: ActionType<typeof locations>) => {
  next(action);

  if (action.type != getType(locations.updateBranches)) {
    return;
  }

  next(locations.fetchBranches.request());
  try {
    const response = await fetch('/data/branches.json');
    const sessionList: Branch[] = await response.json();
    next(locations.fetchBranches.success(sessionList));
  } catch (e) {
    next(locations.fetchBranches.failure(e));
  }
};
