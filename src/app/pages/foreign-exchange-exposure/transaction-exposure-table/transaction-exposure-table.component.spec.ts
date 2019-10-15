import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionExposureTableComponent } from './transaction-exposure-table.component';

describe('TransactionExposureTableComponent', () => {
  let component: TransactionExposureTableComponent;
  let fixture: ComponentFixture<TransactionExposureTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionExposureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionExposureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
