import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryMarketSummaryTableComponent } from './secondary-market-summary-table.component';

describe('SecondaryMarketSummaryTableComponent', () => {
  let component: SecondaryMarketSummaryTableComponent;
  let fixture: ComponentFixture<SecondaryMarketSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryMarketSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryMarketSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
