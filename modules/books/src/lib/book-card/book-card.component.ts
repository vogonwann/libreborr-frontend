import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VolumeInfo } from '../../../../data/src/lib/data/fetch-models';
import { ClrLoadingModule, ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'lb-book-card',
  standalone: true,
  imports: [ClrLoadingModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() image: string | undefined = '';
  @Input() title: string | undefined = '';
  @Input() subtitle: string | undefined;
  @Input() description: string | undefined = '';
  @Input() loading: boolean | ClrLoadingState | string | null = ClrLoadingState.DEFAULT;
  @Input() volumeInfo!: VolumeInfo;

  @Output() add: EventEmitter<VolumeInfo> = new EventEmitter<VolumeInfo>();
  onBtnAddClick($event: MouseEvent) {
    this.add.next(this.volumeInfo);
  }
}
