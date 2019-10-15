import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDevelopmentChartComponent } from './business-development-chart.component';

describe('BusinessDevelopmentChartComponent', () => {
  let component: BusinessDevelopmentChartComponent;
  let fixture: ComponentFixture<BusinessDevelopmentChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDevelopmentChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDevelopmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
