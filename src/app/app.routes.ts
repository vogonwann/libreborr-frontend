import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'books/add',
    pathMatch: 'full',
  },
  {
    path: 'books/add',
    loadComponent: () =>
      import('@libreborr/books').then((m) => m.BooksComponent),
  },
  {
    path: 'books/shelf',
    loadComponent: () =>
      import('@libreborr/books').then((m) => m.BookShelfComponent),
  },
  {
    path: 'books/wishlist',
    loadComponent: () =>
      import('@libreborr/books').then((m) => m.BookWishlistComponent),
  },
  {
    path: 'friends',
    loadComponent: () =>
      import('@libreborr/friends').then((m) => m.FriendsComponent),
  },
];
