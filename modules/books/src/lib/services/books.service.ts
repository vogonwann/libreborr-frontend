import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { BookResult, VolumeInfo } from '../../../../data/src/lib/data/fetch-models';
import { BookInput } from '../../../../data/src/lib/data/inputs';
import { Apollo, gql } from 'apollo-angular';

const SEARCH_API_URL = 'http://localhost:5104/api/books';

const BOOK_UPDATED_SUBSCRIPTION = gql`
    subscription onBookUpdated {
        bookUpdated {
            id
            title
            description
        }
    }
`;

const BOOK_DELETED_SUBSCRIPTION = gql`
    subscription onBookDeleted {
        onBookDeleted {
            id
            title
            description
        }
    }
`;

const GET_BOOKS_QUERY = gql`
    query getBooks {
        books {
            id
            title
            description
            authors
            genres
            image
            isbn
            tags {
                name
            }
        }
    }
`;

const WISHLIST_QUERY = gql`
    query getWishlist {
        wishlistBooks {
            id
            title
            description
            image
            authors
            genres
            isbn
            year
            tags {
                name
            }
        }
    }`

const UPDATE_BOOK_MUTATION = gql`
    mutation UpdateBook($book: BookInput!) {
        updateBook(bookInput: $book) {
            title
            message
            description
            error {
                innerMessage
                message
                code
            }
        }
    }`;

const DELETE_BOOK_MUTATION = gql`
    mutation deleteBook($book: BookInput!) {
      deleteBook(bookInput: $book) {
          title
          id
          description
          message
          error {
              innerMessage
              message
              code
          }
      }
  }`;

@Injectable({providedIn: 'root'})
export class BooksService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly apollo: Apollo) { }

  fetchBooksFromGoogleBooks(bookName: string): Observable<BookResult> {
    return this.httpClient.get<BookResult>(`${SEARCH_API_URL}?book=${bookName}`)
      .pipe(catchError(this.handleError));
  }

  getBooks(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_BOOKS_QUERY,
        fetchPolicy: 'network-only'
      })
      .valueChanges.pipe(map((result: any) => result.data.books));
  }

  getWishlist(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: WISHLIST_QUERY,
        fetchPolicy: 'network-only'
      })
      .valueChanges.pipe(map((result: any) => result.data.books));
  }

  createBook(volumeInfo: VolumeInfo): Observable<any> {
    let book: BookInput = {
      title: volumeInfo.title,
      description: volumeInfo.description,
      authors: volumeInfo.authors.join(','),
      genres: volumeInfo.categories?.join('/'),
      image: volumeInfo.imageLinks?.thumbnail ?? volumeInfo.imageLinks?.smallThumbnail,
      isbn: volumeInfo.industryIdentifiers?.filter(iid => iid.type == "ISBN_10")[0].identifier,
      tags: "",
      year: new Date(volumeInfo.publishedDate).getFullYear()
    };

    console.log(book);

    return this.apollo
      .mutate({
        mutation: gql`
        mutation CreateBook($book: BookInput!) {
          createBook(bookInput: $book) {
              title
              message
              error {
                  innerMessage
                  message
                  code
              }
          }
        }`,
        variables: { book }
      });
  }

  updateBook(volumeInfo: any): Observable<any> {
    let book: BookInput = {
      id: volumeInfo.id,
      title: volumeInfo.title,
      description: volumeInfo.description,
      year: volumeInfo.year,
      tags: volumeInfo.tags.map((t: any)=> { return t.name }).join(','),
    };

    return this.apollo.mutate({
      mutation: UPDATE_BOOK_MUTATION,
      variables: { book }
    });
  }

  subscribeToBooksUpdate(): Observable<any> {
    return this.apollo
    .subscribe({
      query: BOOK_UPDATED_SUBSCRIPTION ,
    })
    .pipe(map((result: any) => {
      return result.data;
    }));
  }

  subscribeToBookDeleted(): Observable<any> {
    return this.apollo
      .subscribe({
        query: BOOK_DELETED_SUBSCRIPTION ,
      })
      .pipe(map((result: any) => {
        return result.data;
      }));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  deleteBook(bookToDelete: any) {
    let book: BookInput = {
      id: bookToDelete.id,
      title: bookToDelete.title,
      description: bookToDelete.description
    };

    return this.apollo.mutate({
      mutation: DELETE_BOOK_MUTATION,
      variables: { book }
    });
  }
}
