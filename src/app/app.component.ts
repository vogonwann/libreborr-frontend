import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClarityModule, ClrFormsModule, ClrInputModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import {
  ClarityIcons,
  usersIcon,
  bookIcon,
  bookmarkIcon,
} from '@cds/core/icon';
import { BooksFacade } from './stores/books/+state/books.facade';
import { FormsModule } from '@angular/forms';

ClarityIcons.addIcons(usersIcon, bookIcon, bookmarkIcon);

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    ClrFormsModule,
    ClrInputModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'libreborr';
  searchTerm!: string;

  constructor(
    private readonly router: Router,
    private readonly booksFacade: BooksFacade,
  ) {}

  search(searchEvent: any) {
    if (this.router.url.includes('books/shelf')) {
      this.booksFacade.searchBookShelf(this.searchTerm);
    }
  }
}
