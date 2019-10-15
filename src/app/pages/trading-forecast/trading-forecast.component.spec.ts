import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingForecastComponent } from './trading-forecast.component';

describe('TradingForecastComponent', () => {
  let component: TradingForecastComponent;
  let fixture: ComponentFixture<TradingForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
