import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as BooksActions from './books.actions';
import { BooksService } from '@libreborr/books';

@Injectable()
export class BooksEffects {
  private actions$ = inject(Actions);
  private readonly booksService = inject(BooksService);
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.initBooks),
      switchMap(() =>
        this.booksService.getBooks()
          .pipe(map(result => BooksActions.loadBooksSuccess({books: result}))
        )),
      catchError((error) => {
        console.error('Error', error);
        return of(BooksActions.loadBooksFailure({ error }));
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.addBook),
      switchMap((action) =>
        this.booksService.createBook(action.book)
          .pipe(map(result => BooksActions.addBookSuccess({book: result})))
    ),
      catchError((error) => {
        console.error('Error', error);
        return of(BooksActions.addBookFailure({ error }));
      })
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.updateBook),
      switchMap((action) =>
        this.booksService.updateBook(action.book)
          .pipe(map(result => BooksActions.updateBookSuccess({book: result})))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(BooksActions.updateBookFailure({ error }));
      })
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.deleteBook),
      switchMap((action) =>
        this.booksService.deleteBook(action.book.id)
          .pipe(map(() => BooksActions.deleteBookSuccess()))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(BooksActions.deleteBookFailure({ error }));
      })
    )
  )

  searchGoogleBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchGoogleBooks),
      switchMap((action) =>
            this.booksService.fetchBooksFromGoogleBooks(action.searchText)
              .pipe(map((result) => BooksActions.searchGoogleBooksSuccess({books: result})))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(BooksActions.searchGoogleBooksFailure({ error }));
      })
    )
  )
}
