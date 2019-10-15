import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtsManagementDashboardComponent } from './cts-management-dashboard.component';

describe('CtsManagementDashboardComponent', () => {
  let component: CtsManagementDashboardComponent;
  let fixture: ComponentFixture<CtsManagementDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtsManagementDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtsManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
