import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiringInterestTermsTableComponent } from './expiring-interest-terms-table.component';

describe('ExpiringInterestTermsTableComponent', () => {
  let component: ExpiringInterestTermsTableComponent;
  let fixture: ComponentFixture<ExpiringInterestTermsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiringInterestTermsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiringInterestTermsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
