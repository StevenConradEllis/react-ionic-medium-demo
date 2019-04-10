import * as branches from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { BranchState } from "./types";

const defaultState: BranchState = {
  branches: []
}

export type BranchAction = ActionType<typeof branches>;

export default (state = defaultState, action: BranchAction): BranchState => {
  switch (action.type) {
    case getType(branches.fetchBranches.success):
      return {
        ...state,
        branches: action.payload
      }
    default:
      return state;
  }
};

