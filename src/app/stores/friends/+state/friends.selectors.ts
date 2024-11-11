import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FRIENDS_FEATURE_KEY,
  FriendsState,
  friendsAdapter,
} from './friends.reducer';

// Lookup the 'Friends' feature state managed by NgRx
export const selectFriendsState =
  createFeatureSelector<FriendsState>(FRIENDS_FEATURE_KEY);

const { selectAll, selectEntities } = friendsAdapter.getSelectors();

export const selectFriendsLoaded = createSelector(
  selectFriendsState,
  (state: FriendsState) => state.loaded
);

export const selectFriendsError = createSelector(
  selectFriendsState,
  (state: FriendsState) => state.error
);

export const selectAllFriends = createSelector(
  selectFriendsState,
  (state: FriendsState) => selectAll(state)
);

export const selectFriendsEntities = createSelector(
  selectFriendsState,
  (state: FriendsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectFriendsState,
  (state: FriendsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectFriendsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
