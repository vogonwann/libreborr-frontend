import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as BooksActions from './books.actions';
import { BooksEntity } from './books.models';
import { BookResponse, BookResult } from '@libreborr/data';

export const BOOKS_FEATURE_KEY = 'books';

export interface BooksState extends EntityState<BooksEntity> {
  selectedId?: string | number; // which Books record has been selected
  loaded: boolean; // has the Books list been loaded
  error?: string | null;
  bookShelf?: BooksEntity[];
  googleBooks?: BookResult;
  groupedBookShelf?: BookResponse[][];// last known error (if any)
}

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: BooksState;
}

export const booksAdapter: EntityAdapter<BooksEntity> =
  createEntityAdapter<BooksEntity>();

export const initialBooksState: BooksState = booksAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialBooksState,
  on(BooksActions.initBooks, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BooksActions.loadBooksSuccess, (state, { books }) =>
    booksAdapter.setAll(books, { ...state, loaded: true, bookShelf: books, groupedBookShelf: partition(books, 3) })
  ),
  on(BooksActions.loadBooksFailure, (state, { error }) => ({ ...state, error })),
  on(BooksActions.searchBooks, (state, { searchText }) => {
    if (!searchText) {
      const partitionedBooks = partition(state.bookShelf ?? [], 3);
      booksAdapter.setAll(state.bookShelf!, { ...state, loaded: true, bookShelf: state.bookShelf, groupedBookShelf: partitionedBooks });
      return state;
    }
    const filteredBooks = state.bookShelf?.filter(b => b.title?.toLowerCase().includes(searchText.toLowerCase()) || b.description?.includes(searchText.toLowerCase())) ?? [];
    state = {
      ...state,
      groupedBookShelf: partition(filteredBooks ?? [], 3)
    };

    return state;
  }),
  on(BooksActions.searchGoogleBooks, (state, { searchText }) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(BooksActions.searchGoogleBooksSuccess, (state, { books }) => ({
    ...state,
    googleBooks: books,
    loaded: true,
  })),
  on(BooksActions.searchGoogleBooksFailure, (state, { error }) => ({ ...state, error, loaded: true })),


);

export function booksReducer(state: BooksState | undefined, action: Action) {
  return reducer(state, action);
}

const partition = (array: any[], size: number): any[][] => {
  if (size <= 0 || !array) {
    return [];
  }
  const result: any[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
