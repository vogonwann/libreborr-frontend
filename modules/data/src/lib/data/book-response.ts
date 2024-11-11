import { BookError } from './error';

export interface BookResponse {
  id: number;
  title: string;
  description: string;
  message: string;
  error: BookError;
}


