import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertManagementComponent } from './alert-management.component';

describe('AlertManagementComponent', () => {
  let component: AlertManagementComponent;
  let fixture: ComponentFixture<AlertManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
