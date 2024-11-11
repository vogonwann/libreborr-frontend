import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as FriendsActions from './friends.actions';
import { FriendsEffects } from './friends.effects';
import { FriendsFacade } from './friends.facade';
import { FriendsEntity } from './friends.models';
import {
  FRIENDS_FEATURE_KEY,
  FriendsState,
  initialFriendsState,
  friendsReducer,
} from './friends.reducer';
import * as FriendsSelectors from './friends.selectors';

interface TestSchema {
  friends: FriendsState;
}

describe('FriendsFacade', () => {
  let facade: FriendsFacade;
  let store: Store<TestSchema>;
  const createFriendsEntity = (id: string, name = ''): FriendsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FRIENDS_FEATURE_KEY, friendsReducer),
          EffectsModule.forFeature([FriendsEffects]),
        ],
        providers: [FriendsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(FriendsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allFriends$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allFriends$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadFriendsSuccess` to manually update list
     */
    it('allFriends$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allFriends$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        FriendsActions.loadFriendsSuccess({
          friends: [createFriendsEntity('AAA'), createFriendsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allFriends$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
