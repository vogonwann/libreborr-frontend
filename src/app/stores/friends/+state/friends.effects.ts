import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as FriendsActions from './friends.actions';
import * as FriendsFeature from './friends.reducer';

@Injectable()
export class FriendsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendsActions.initFriends),
      switchMap(() => of(FriendsActions.loadFriendsSuccess({ friends: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(FriendsActions.loadFriendsFailure({ error }));
      })
    )
  );
}
