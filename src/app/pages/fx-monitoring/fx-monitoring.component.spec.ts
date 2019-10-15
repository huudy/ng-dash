import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxMonitoringComponent } from './fx-monitoring.component';

describe('FxMonitoringComponent', () => {
  let component: FxMonitoringComponent;
  let fixture: ComponentFixture<FxMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
