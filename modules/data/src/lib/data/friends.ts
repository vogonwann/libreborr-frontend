import { Book } from './book';

export interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  nickname: string;
  books: Book[];
}