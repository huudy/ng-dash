import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmtMaturitiesTableComponent } from './mgmt-maturities-table.component';

describe('MgmtMaturitiesTableComponent', () => {
  let component: MgmtMaturitiesTableComponent;
  let fixture: ComponentFixture<MgmtMaturitiesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgmtMaturitiesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmtMaturitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
