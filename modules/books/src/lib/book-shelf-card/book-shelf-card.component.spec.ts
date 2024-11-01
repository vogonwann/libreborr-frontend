import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookShelfCardComponent } from './book-shelf-card.component';

describe('BookShelfCardComponent', () => {
  let component: BookShelfCardComponent;
  let fixture: ComponentFixture<BookShelfCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookShelfCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookShelfCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
