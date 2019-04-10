import { LocationState, Location } from './types';

export function mapCenter(state: LocationState): Location {
  const item = state.locations.filter(l => l.id === state.mapCenterId)[0];

  if (item == null) {
    return {
      id: 1,
      name: "Map Center",
      lat: 51.49078959803455,
      lng: -0.20015716552734375
    };
  }

  return item;
}

export function allLocations(state: LocationState) {
  return state.locations.filter(l => l.id !== state.mapCenterId)
}
