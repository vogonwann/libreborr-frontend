import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ByteArrayToBase64Pipe } from '@libreborr/books';

@Component({
  selector: 'lib-book-shelf-card',
  standalone: true,
  imports: [ByteArrayToBase64Pipe],
  templateUrl: './book-shelf-card.component.html',
  styleUrl: './book-shelf-card.component.css',
})
export class BookShelfCardComponent implements OnInit {
  @Input() item: any;
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  tags: any[] = [];

  ngOnInit(): void {
    if (!this.item.tags) return;

    this.tags = this.item.tags;
  }

  onEditClick() {
    this.edit.emit(this.item);
  }

  onDeleteClick() {
    this.delete.emit(this.item);
  }
}
