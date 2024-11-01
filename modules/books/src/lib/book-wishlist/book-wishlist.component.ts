import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { BookInput } from '../models/inputs';
import { ClrDatagrid, ClrDatagridModule } from '@clr/angular';
import { BookTagsPipe } from '../pipes/book-tags.pipe';
import { IsbnDbLinkPipe } from '../pipes/isbn-db-link.pipe';

@Component({
  selector: 'lib-book-wishlist',
  standalone: true,
  imports: [ClrDatagridModule, BookTagsPipe, IsbnDbLinkPipe],
  templateUrl: './book-wishlist.component.html',
  styleUrl: './book-wishlist.component.css',
})
export class BookWishlistComponent implements OnInit {
  wishlistBooks: BookInput[] = [];
  constructor(private readonly booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: data => {
        this.wishlistBooks = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
