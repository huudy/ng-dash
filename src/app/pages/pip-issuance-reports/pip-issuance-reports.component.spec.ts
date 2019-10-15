import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipIssuanceReportsComponent } from './pip-issuance-reports.component';

describe('PipIssuanceReportsComponent', () => {
  let component: PipIssuanceReportsComponent;
  let fixture: ComponentFixture<PipIssuanceReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipIssuanceReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipIssuanceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
