import { FishState, Fish } from './types';

export function allTags(state: FishState) {
  return state.fishes
    .reduce((all, fish) => all.concat(fish.tags), <string[]>[])
    .filter((trackName, index, array) => array.indexOf(trackName) === index)
    .sort();
}

export function allFiltered(state: FishState) {
  let searchFishes = searchText(state.searchText);
  let searchTags = filterByTag(state.tagFilters);

  return state.fishes
    .filter(searchFishes)
    .filter(searchTags);
}

export function favoritesFiltered(state: FishState) {
  let searchFishes = searchText(state.searchText);
  let searchTags = filterByTag(state.tagFilters);

  function isFavorite(fish: Fish) {
    return state.favoriteFishes.indexOf(fish.id) !== -1;
  }

  return state.fishes
    .filter(isFavorite)
    .filter(searchFishes)
    .filter(searchTags);
}

function searchText(searchText: string) {
  if (!searchText) {
    return () => true;
  }
  const lowerSearchText = searchText.toLowerCase();
  return (fish: Fish) => fish.name.toLowerCase().indexOf(lowerSearchText) !== -1;
}

function filterByTag(tagFilters: string[]) {
  if (tagFilters.length === 0) {
    return () => true;
  }
  return (fish: Fish) => (
    fish.tags.some(fishTagName => (
      tagFilters.some(tagName => tagName === fishTagName)
    ))
  );
}
