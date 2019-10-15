import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPurchaseHistoryTableComponent } from './product-purchase-history-table.component';

describe('ProductPurchaseHistoryTableComponent', () => {
  let component: ProductPurchaseHistoryTableComponent;
  let fixture: ComponentFixture<ProductPurchaseHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPurchaseHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPurchaseHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
