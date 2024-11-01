import { Component, OnInit } from '@angular/core';
import { ByteArrayToBase64Pipe } from '../pipes/byte-array-to-base64.pipe';
import { BookShelfCardComponent } from '../book-shelf-card/book-shelf-card.component';
import { CommonModule } from '@angular/common';
import {
  ClrFormsModule,
  ClrInputModule,
  ClrModalModule,
  ClrTextareaModule,
} from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'lib-book-shelf',
  standalone: true,
  imports: [
    ByteArrayToBase64Pipe,
    BookShelfCardComponent,
    CommonModule,
    ClrModalModule,
    ClrFormsModule,
    ClrInputModule,
    FormsModule,
    ClrTextareaModule,
  ],
  templateUrl: './book-shelf.component.html',
  styleUrl: './book-shelf.component.css',
})
export class BookShelfComponent implements OnInit {
  data!: any[];
  unfilteredData!: any[];
  loading = true;
  error!: any;
  groupedItems: any[][] = [];
  showEditModal = false;
  editedItem: any;
  itemToDelete: any;
  editedTags: string = '';
  showConfirmDeleteModal: boolean = false;

  constructor(private readonly bookService: BooksService) {
    this.bookService.subscribeToBooksUpdate().subscribe((result: any) => {
      const index = this.data.findIndex(
        (b: any) => b.id == result.bookUpdated.id
      );
      if (index >= 0) {
        const changed = {
          ...this.data[index],
          title: result.bookUpdated.title,
          description: result.bookUpdated.description,
        };
        this.data = [
          ...[...this.data].splice(0, index),
          changed,
          ...[...this.data].splice(index + 1),
        ];
        this.groupedItems = this.partition(this.data, 3);
      }
    });

    this.bookService.subscribeToBookDeleted().subscribe((result: any) => {
      const index = this.data.findIndex(
        (b: any) => b.id == result.onBookDeleted.id
      );
      if (index >= 0) {
        this.data = [
          ...[...this.data].splice(0, index),
          ...[...this.data].splice(index + 1),
        ];
        this.groupedItems = this.partition(this.data, 3);
      }
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((result: any) => {
      this.data = result;
      this.unfilteredData = [...this.data];
      this.groupedItems = this.partition(this.data, 3);
      this.loading = false;
    });
  }

  partition(array: any[], size: number): any[][] {
    const result: any[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  onEdit(book: any) {
    this.showEditModal = true;
    this.editedItem = book;
    this.editedTags = this.editedItem.tags.map((t: any) => t.name).join(',');
  }

  saveTags() {
    this.editedItem = {
      ...this.editedItem,
      tags: this.editedTags.split(',').map((t) => {
        return { __typename: 'Tag', name: t };
      }),
      year: this.editedItem.year ?? 1970,
    };
    console.log(this.editedItem);
    this.bookService.updateBook(this.editedItem).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.showEditModal = false;
  }

  onTitleChanged(title: any) {
    this.editedItem = {
      ...this.editedItem,
      title: title,
    };
  }

  onDescriptionChanged(description: any) {
    this.editedItem = {
      ...this.editedItem,
      description: description,
    };
  }

  confirmDelete() {
    this.bookService.deleteBook(this.itemToDelete).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.showConfirmDeleteModal = false;
  }

  onDelete(book: any) {
    this.itemToDelete = book;
    this.showConfirmDeleteModal = true;
  }

  search() {
    if (!this.searchTerm || this.searchTerm === '') {
      this.data = [...this.unfilteredData];
      this.groupedItems = this.partition(this.data, 3);
      return;
    }
    this.data = this.data.filter(b => b.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) || b.author?.includes(this.searchTerm));
    console.log(this.data);
    this.groupedItems = this.partition(this.data, 3);
  }

  searchTerm = '';
  setSearchTerm(searchTerm: KeyboardEvent) {
    console.log(this.searchTerm);
  }
}
