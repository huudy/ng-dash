import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuanceChartComponent } from './issuance-chart.component';

describe('IssuanceChartComponent', () => {
  let component: IssuanceChartComponent;
  let fixture: ComponentFixture<IssuanceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuanceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
