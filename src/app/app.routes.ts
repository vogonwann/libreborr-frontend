import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
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
