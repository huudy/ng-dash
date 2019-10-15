import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsTopologyChartComponent } from './earnings-topology-chart.component';

describe('EarningsTopologyChartComponent', () => {
  let component: EarningsTopologyChartComponent;
  let fixture: ComponentFixture<EarningsTopologyChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsTopologyChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsTopologyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
