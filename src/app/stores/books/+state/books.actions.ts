import { createAction, props } from '@ngrx/store';
import { BooksEntity } from './books.models';
import { BookResponse, BookResult, VolumeInfo } from '@libreborr/data';

export const initBooks = createAction('[Books Page] Init');

export const loadBooksSuccess = createAction(
  '[Books/API] Load Books Success',
  props<{ books: BooksEntity[] }>()
);

export const loadBooksFailure = createAction(
  '[Books/API] Load Books Failure',
  props<{ error: any }>()
);

export const searchBooks = createAction(
  '[Books Page] Search Books',
  props<{ searchText: string }>()
);

export const addBook = createAction(
  '[Books Page] Add Book',
  props<{ book: VolumeInfo }>()
);

export const addBookSuccess = createAction(
  '[Books/API] Add Book Success',
  props<{ book: BookResponse }>()
);

export const addBookFailure = createAction(
  '[Books/API] Add Book Failure',
  props<{ error: any }>()
);

export const updateBook = createAction(
  '[Books Page] Update Book',
  props<{ book: BooksEntity }>()
);

export const updateBookSuccess = createAction(
  '[Books/API] Update Book Success',
  props<{ book: BookResponse }>()
);

export const updateBookFailure = createAction(
  '[Books/API] Update Book Failure',
  props<{ error: any }>()
);

export const deleteBook = createAction(
  '[Books Page] Delete Book',
  props<{ book: BooksEntity }>()
);

export const deleteBookSuccess = createAction(
  '[Books/API] Delete Book Success'
);

export const deleteBookFailure = createAction(
  '[Books/API] Delete Book Failure',
  props<{ error: any }>()
);

export const searchGoogleBooks = createAction(
  '[Books Page] Search Google Books',
  props<{ searchText: string }>()
);

export const searchGoogleBooksSuccess = createAction(
  '[Books/API] Search Google Books Success',
  props<{ books: BookResult }>()
);

export const searchGoogleBooksFailure = createAction(
  '[Books/API] Search Google Books Failure',
  props<{ error: any }>()
);
