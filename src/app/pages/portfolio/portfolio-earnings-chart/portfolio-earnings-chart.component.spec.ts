import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioEarningsChartComponent } from './portfolio-earnings-chart.component';

describe('PortfolioEarningsChartComponent', () => {
  let component: PortfolioEarningsChartComponent;
  let fixture: ComponentFixture<PortfolioEarningsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioEarningsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioEarningsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
