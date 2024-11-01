import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookTags',
  standalone: true
})
export class BookTagsPipe implements PipeTransform {

  transform(value: { name: string}[], ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }

    return value.map(t => { return t.name}).join(', ');
  }

}
