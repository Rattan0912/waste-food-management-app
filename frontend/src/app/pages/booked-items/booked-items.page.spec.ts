import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookedItemsPage } from './booked-items.page';

describe('BookedItemsPage', () => {
  let component: BookedItemsPage;
  let fixture: ComponentFixture<BookedItemsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
