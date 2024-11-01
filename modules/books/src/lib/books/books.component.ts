import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ClrButtonModule,
  ClrFormsModule,
  ClrInputModule,
  ClrLoadingModule,
  ClrLoadingState,
} from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { BookResult, VolumeInfo } from '../models/fetch-models';
import { BookCardComponent } from '../book-card/book-card.component';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'lib-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClrFormsModule,
    ClrInputModule,
    ClrButtonModule,
    ClrLoadingModule,
    BookCardComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  searchBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  addBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  input: string = '';
  data: BookResult | undefined;

  constructor(
    private readonly booksService: BooksService,
    private readonly apollo: Apollo
  ) {}

  searchBooks() {
    this.searchBtnState = ClrLoadingState.LOADING;

    this.booksService.fetchBooksFromGoogleBooks(this.input).subscribe({
      next: (response) => {
        console.log(response);
        this.data = response;
        this.searchBtnState = ClrLoadingState.SUCCESS;
        this.apollo
          .watchQuery({
            query: gql`
              query getBooks {
                books {
                  isbn
                }
              }
            `,
          })
          .valueChanges.forEach((isbn) => {
            console.log(isbn);
          });
      },
      error: (error) => {
        console.error(error);
        this.searchBtnState = ClrLoadingState.ERROR;
      },
    });
  }

  onBookAdd(volumeInfo: VolumeInfo) {
    this.addBtnState = ClrLoadingState.LOADING;
    this.booksService.createBook(volumeInfo).subscribe((result) => ({
      next: () => {
        this.addBtnState = ClrLoadingState.SUCCESS;
        volumeInfo = {
          ...volumeInfo,
          added: true,
        };
      },
      error: (error: any) => {
        console.error(error);
        this.addBtnState = ClrLoadingState.ERROR;
      },
    }));
  }
}
