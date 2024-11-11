import { FriendsEntity } from './friends.models';
import {
  friendsAdapter,
  FriendsPartialState,
  initialFriendsState,
} from './friends.reducer';
import * as FriendsSelectors from './friends.selectors';

describe('Friends Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFriendsId = (it: FriendsEntity) => it.id;
  const createFriendsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FriendsEntity);

  let state: FriendsPartialState;

  beforeEach(() => {
    state = {
      friends: friendsAdapter.setAll(
        [
          createFriendsEntity('PRODUCT-AAA'),
          createFriendsEntity('PRODUCT-BBB'),
          createFriendsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialFriendsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Friends Selectors', () => {
    it('selectAllFriends() should return the list of Friends', () => {
      const results = FriendsSelectors.selectAllFriends(state);
      const selId = getFriendsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = FriendsSelectors.selectEntity(state) as FriendsEntity;
      const selId = getFriendsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectFriendsLoaded() should return the current "loaded" status', () => {
      const result = FriendsSelectors.selectFriendsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectFriendsError() should return the current "error" state', () => {
      const result = FriendsSelectors.selectFriendsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
