import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradedCurrenciesChartComponent } from './traded-currencies-chart.component';

describe('TradedCurrenciesChartComponent', () => {
  let component: TradedCurrenciesChartComponent;
  let fixture: ComponentFixture<TradedCurrenciesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradedCurrenciesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradedCurrenciesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
