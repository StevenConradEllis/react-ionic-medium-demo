import { createAction, createAsyncAction } from 'typesafe-actions';
import { Branch } from './types';

export const fetchBranches = createAsyncAction(
  'branches/FETCH_REQUEST',
  'branches/FETCH_SUCCESS',
  'branches/FETCH_FAILURE'
)<void, Branch[], Error>();

export const updateBranches = createAction('locations/UPDATE_BRANCHES', resolve =>
  () => resolve()
);
