import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbnDbLink',
  standalone: true
})
export class IsbnDbLinkPipe implements PipeTransform {

  transform(value: string | undefined, ...args: string[]): unknown {
    return `https://isbndb.com/book/${encodeURIComponent(value as string)}`;
  }

}
