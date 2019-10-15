import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmtNewLoansTableComponent } from './mgmt-new-loans-table.component';

describe('MgmtNewLoansTableComponent', () => {
  let component: MgmtNewLoansTableComponent;
  let fixture: ComponentFixture<MgmtNewLoansTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmtNewLoansTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmtNewLoansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
