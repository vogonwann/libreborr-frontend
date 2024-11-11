import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDataGridComponent } from './friends-data-grid.component';

describe('FriendsDataGridComponent', () => {
  let component: FriendsDataGridComponent;
  let fixture: ComponentFixture<FriendsDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendsDataGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
