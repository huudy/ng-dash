import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSettlementRiskClientComponent } from './pre-settlement-risk-client.component';

describe('PreSettlementRiskClientComponent', () => {
  let component: PreSettlementRiskClientComponent;
  let fixture: ComponentFixture<PreSettlementRiskClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreSettlementRiskClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSettlementRiskClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
