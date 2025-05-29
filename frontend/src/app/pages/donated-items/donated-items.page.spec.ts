import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonatedItemsPage } from './donated-items.page';

describe('DonatedItemsPage', () => {
  let component: DonatedItemsPage;
  let fixture: ComponentFixture<DonatedItemsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatedItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
