import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputyManagementComponent } from './deputy-management.component';

describe('DeputyManagementComponent', () => {
  let component: DeputyManagementComponent;
  let fixture: ComponentFixture<DeputyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
