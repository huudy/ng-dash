import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingProductsComponent } from './trending-products.component';

describe('TrendingProductsComponent', () => {
  let component: TrendingProductsComponent;
  let fixture: ComponentFixture<TrendingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
