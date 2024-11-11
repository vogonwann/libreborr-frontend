import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { FriendsDataGridComponent } from '../friends-data-grid/friends-data-grid.component';
import { FriendsService } from '../services/friends-service.service';
import { Observable } from 'rxjs';
import { Friend } from '@libreborr/data';

@Component({
  selector: 'lib-friends',
  standalone: true,
  imports: [CommonModule, FriendsDataGridComponent],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
})
export class FriendsComponent implements OnInit {
  friends!: Observable<Friend[]>;
  constructor(private readonly friendsService: FriendsService) {}
  ngOnInit(): void {
    this.friends = this.friendsService.getFriends();
  }
}
