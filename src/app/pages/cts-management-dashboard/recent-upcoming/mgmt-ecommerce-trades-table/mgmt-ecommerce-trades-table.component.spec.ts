import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmtEcommerceTradesTableComponent } from './mgmt-ecommerce-trades-table.component';

describe('MgmtEcommerceTradesTableComponent', () => {
  let component: MgmtEcommerceTradesTableComponent;
  let fixture: ComponentFixture<MgmtEcommerceTradesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmtEcommerceTradesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmtEcommerceTradesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
