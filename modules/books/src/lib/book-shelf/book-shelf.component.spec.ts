import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookShelfComponent } from './book-shelf.component';

describe('BookShelfComponent', () => {
  let component: BookShelfComponent;
  let fixture: ComponentFixture<BookShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookShelfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
