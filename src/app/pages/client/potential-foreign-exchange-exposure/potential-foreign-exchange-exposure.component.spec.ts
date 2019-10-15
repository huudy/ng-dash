import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialForeignExchangeExposureComponent } from './potential-foreign-exchange-exposure.component';

describe('PotentialForeignExchangeExposureComponent', () => {
  let component: PotentialForeignExchangeExposureComponent;
  let fixture: ComponentFixture<PotentialForeignExchangeExposureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotentialForeignExchangeExposureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialForeignExchangeExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
