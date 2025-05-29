import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonateFoodPage } from './donate-food.page';

describe('DonateFoodPage', () => {
  let component: DonateFoodPage;
  let fixture: ComponentFixture<DonateFoodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
