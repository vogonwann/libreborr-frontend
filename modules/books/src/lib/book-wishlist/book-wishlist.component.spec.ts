import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWishlistComponent } from './book-wishlist.component';

describe('BookWishlistComponent', () => {
  let component: BookWishlistComponent;
  let fixture: ComponentFixture<BookWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookWishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
