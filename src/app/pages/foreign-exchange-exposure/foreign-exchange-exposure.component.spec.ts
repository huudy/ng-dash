import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignExchangeExposureComponent } from './foreign-exchange-exposure.component';

describe('ForeignExchangeExposureComponent', () => {
  let component: ForeignExchangeExposureComponent;
  let fixture: ComponentFixture<ForeignExchangeExposureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignExchangeExposureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignExchangeExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
