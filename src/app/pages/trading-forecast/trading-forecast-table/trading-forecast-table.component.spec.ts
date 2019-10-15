import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingForecastTableComponent } from './trading-forecast-table.component';

describe('TradingForecastTableComponent', () => {
  let component: TradingForecastTableComponent;
  let fixture: ComponentFixture<TradingForecastTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingForecastTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingForecastTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
