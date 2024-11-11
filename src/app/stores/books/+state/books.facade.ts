import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as BooksActions from './books.actions';
import * as BooksFeature from './books.reducer';
import * as BooksSelectors from './books.selectors';

@Injectable()
export class BooksFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BooksSelectors.selectBooksLoaded));
  allBooks$ = this.store.pipe(select(BooksSelectors.selectAllBooks));
  selectedBooks$ = this.store.pipe(select(BooksSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BooksActions.initBooks());
  }

  searchBookShelf(searchText: string) {
    this.store.dispatch(BooksActions.searchBooks({ searchText }));
  }

  searchGoogleBooks(searchText: string) {
    this.store.dispatch(BooksActions.searchGoogleBooks({ searchText }));
  }

  getGroupedItems$ =
    this.store.pipe(select(BooksSelectors.selectGroupedBooks))

  getGoogleBooks$ =
    this.store.pipe(select(BooksSelectors.selectGoogleBooks))
}
