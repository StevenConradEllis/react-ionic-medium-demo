import { createAction, createAsyncAction } from 'typesafe-actions';
import { Fish } from './types';

export const fetchFishes = createAsyncAction(
  'fishes/FETCH_REQUEST',
  'fishes/FETCH_SUCCESS',
  'fishes/FETCH_FAILURE'
)<void, Fish[], Error>();

export const updateFishes = createAction('fishes/UPDATE_FISHES', resolve =>
  () => resolve()
);

export const setSearchText = createAction('fishes/SET_SEARCH_TEXT', resolve =>
  (searchText: string) => resolve(searchText)
);

export const addTagFilter = createAction('fishes/ADD_TAG_FILTER', resolve =>
  (trackName: string) => resolve(trackName)
);

export const removeTagFilter = createAction('fishes/REMOVE_TAG_FILTER', resolve =>
  (trackName: string) => resolve(trackName)
);

export const updateTagFilters = createAction('fishes/UPDATE_TAG_FILTERS', resolve =>
  (trackNames: string[]) => resolve(trackNames)
);

export const addFavorite = createAction('fishes/ADD_FAVORITE', resolve =>
  (fishId: number) => resolve(fishId)
);

export const removeFavorite = createAction('fishes/REMOVE_FAVORITE', resolve =>
  (fishId: number) => resolve(fishId)
);

export const updateFavoriteFilter = createAction('fishes/UPDATE_FAVORITE_FILTER', resolve =>
  (fishIds: number[]) => resolve(fishIds)
);
