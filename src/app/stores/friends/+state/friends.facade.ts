import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as FriendsActions from './friends.actions';
import * as FriendsFeature from './friends.reducer';
import * as FriendsSelectors from './friends.selectors';

@Injectable()
export class FriendsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(FriendsSelectors.selectFriendsLoaded));
  allFriends$ = this.store.pipe(select(FriendsSelectors.selectAllFriends));
  selectedFriends$ = this.store.pipe(select(FriendsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(FriendsActions.initFriends());
  }
}
