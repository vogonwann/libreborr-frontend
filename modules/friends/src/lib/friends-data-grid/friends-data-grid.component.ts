import { Component, Input } from '@angular/core';
import { ClrDatagridModule } from '@clr/angular';
import { Friend } from '@libreborr/data';

@Component({
  selector: 'friends-data-grid',
  standalone: true,
  imports: [ClrDatagridModule],
  templateUrl: './friends-data-grid.component.html',
  styleUrl: './friends-data-grid.component.css'
})
export class FriendsDataGridComponent {
  @Input() friends: Friend[] | null = [];
}
