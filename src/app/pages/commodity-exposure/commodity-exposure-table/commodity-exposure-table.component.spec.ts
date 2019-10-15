import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityExposureTableComponent } from './commodity-exposure-table.component';

describe('CommodityExposureTableComponent', () => {
  let component: CommodityExposureTableComponent;
  let fixture: ComponentFixture<CommodityExposureTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityExposureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityExposureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
