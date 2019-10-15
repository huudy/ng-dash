import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommercePerformanceChartComponent } from './ecommerce-performance-chart.component';

describe('EcommercePerformanceChartComponent', () => {
  let component: EcommercePerformanceChartComponent;
  let fixture: ComponentFixture<EcommercePerformanceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommercePerformanceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommercePerformanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
