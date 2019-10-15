import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTradeComponent } from './next-trade.component';

describe('NextTradeComponent', () => {
  let component: NextTradeComponent;
  let fixture: ComponentFixture<NextTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
