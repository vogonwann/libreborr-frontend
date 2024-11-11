import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Friend } from '../../../../data/src/lib/data/friends';
import { map, Observable } from 'rxjs';

const GET_FRIENDS_GQL = gql`
    query getFriends {
        friends {
            id
            firstName
            lastName
            nickname
            books {
                id
                title
                description
                image
                authors
                genres
                isbn
                year
                tags {
                    name
                }
            }
        }
    }
`;

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  getFriends(): Observable<Friend[]> {
    return this.apollo
      .watchQuery({
        query: GET_FRIENDS_GQL,
        fetchPolicy: 'network-only'
      })
      .valueChanges.pipe(map((result: any) => result.data.friends as Friend[]));
  }
}
