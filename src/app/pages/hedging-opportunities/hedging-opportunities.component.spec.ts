import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HedgingOpportunitiesComponent } from './hedging-opportunities.component';

describe('HedgingOpportunitiesComponent', () => {
  let component: HedgingOpportunitiesComponent;
  let fixture: ComponentFixture<HedgingOpportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HedgingOpportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HedgingOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
