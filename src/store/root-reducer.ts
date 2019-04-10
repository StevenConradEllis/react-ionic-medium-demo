import { combineReducers } from 'redux';

import locations from './locations/reducer';
import fishes from './fishes/reducer';
import branches from './branches/reducer';

const rootReducer = combineReducers({
  locations,
  fishes,
  branches
});

export default rootReducer;
