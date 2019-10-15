import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipTableauReportsComponent } from './pip-tableau-reports.component';

describe('PipTableauReportsComponent', () => {
  let component: PipTableauReportsComponent;
  let fixture: ComponentFixture<PipTableauReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipTableauReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipTableauReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
