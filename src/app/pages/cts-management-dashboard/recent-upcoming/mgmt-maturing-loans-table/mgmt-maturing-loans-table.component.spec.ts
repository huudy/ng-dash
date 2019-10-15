import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmtMaturingLoansTableComponent } from './mgmt-maturing-loans-table.component';

describe('MgmtMaturingLoansTableComponent', () => {
  let component: MgmtMaturingLoansTableComponent;
  let fixture: ComponentFixture<MgmtMaturingLoansTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmtMaturingLoansTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmtMaturingLoansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
