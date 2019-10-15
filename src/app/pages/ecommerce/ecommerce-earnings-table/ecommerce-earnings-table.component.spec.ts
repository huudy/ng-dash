import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceEarningsTableComponent } from './ecommerce-earnings-table.component';

describe('EcommerceEarningsTableComponent', () => {
  let component: EcommerceEarningsTableComponent;
  let fixture: ComponentFixture<EcommerceEarningsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceEarningsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceEarningsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
