import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityExposureComponent } from './commodity-exposure.component';

describe('CommodityExposureComponent', () => {
  let component: CommodityExposureComponent;
  let fixture: ComponentFixture<CommodityExposureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityExposureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
