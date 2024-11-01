import { BookTagsPipe } from './book-tags.pipe';

describe('BookTagsPipe', () => {
  it('create an instance', () => {
    const pipe = new BookTagsPipe();
    expect(pipe).toBeTruthy();
  });
});
