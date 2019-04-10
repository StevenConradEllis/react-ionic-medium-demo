import * as locations from './actions';
import {ActionType, getType} from 'typesafe-actions';
import {LocationState} from './types';

const defaultState: LocationState = {
    mapCenterId: 1,
    locations: [],
    userLocationRetrieved: false
};

export type LocationAction = ActionType<typeof locations>

export default (state = defaultState, action: LocationAction): LocationState => {
    switch (action.type) {
        case getType(locations.fetchLocations.success):
            return {
                ...state,
                locations: action.payload
            }
        case getType(locations.updateLocations) :
            const updatedLocations = state.locations.concat(action.payload);
            return {
                ...state,
                locations: updatedLocations,
                userLocationRetrieved : true
            }
        default:
            return state;
    }
};
