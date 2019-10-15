import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitWarningTableComponent } from './limit-warning-table.component';

describe('LimitWarningTableComponent', () => {
  let component: LimitWarningTableComponent;
  let fixture: ComponentFixture<LimitWarningTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitWarningTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitWarningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
