import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HedgingOpportunitiesTableComponent } from './hedging-opportunities-table.component';

describe('HedgingOpportunitiesTableComponent', () => {
  let component: HedgingOpportunitiesTableComponent;
  let fixture: ComponentFixture<HedgingOpportunitiesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HedgingOpportunitiesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HedgingOpportunitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
