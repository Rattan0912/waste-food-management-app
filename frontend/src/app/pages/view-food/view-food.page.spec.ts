import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewFoodPage } from './view-food.page';

describe('ViewFoodPage', () => {
  let component: ViewFoodPage;
  let fixture: ComponentFixture<ViewFoodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
