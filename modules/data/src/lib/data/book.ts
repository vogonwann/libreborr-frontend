import { Tag } from './tag';

export interface Book {
  id: number;
  title?: string;
  description?: string;
  image?: any[];
  tags?: Tag[];
  authors?: string;
  year?: number;
  genres?: string;
  isbn?: string;
}