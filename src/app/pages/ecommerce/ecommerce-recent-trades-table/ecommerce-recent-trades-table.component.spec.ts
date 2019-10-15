import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceRecentTradesTableComponent } from './ecommerce-recent-trades-table.component';

describe('EcommerceRecentTradesTableComponent', () => {
  let component: EcommerceRecentTradesTableComponent;
  let fixture: ComponentFixture<EcommerceRecentTradesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommerceRecentTradesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommerceRecentTradesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
