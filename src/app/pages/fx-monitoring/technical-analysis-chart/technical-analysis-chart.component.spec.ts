import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAnalysisChartComponent } from './technical-analysis-chart.component';

describe('TechnicalAnalysisChartComponent', () => {
  let component: TechnicalAnalysisChartComponent;
  let fixture: ComponentFixture<TechnicalAnalysisChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalAnalysisChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalAnalysisChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
