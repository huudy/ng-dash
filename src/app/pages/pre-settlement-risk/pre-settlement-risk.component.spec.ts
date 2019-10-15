import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSettlementRiskComponent } from './pre-settlement-risk.component';

describe('PreSettlementRiskComponent', () => {
  let component: PreSettlementRiskComponent;
  let fixture: ComponentFixture<PreSettlementRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreSettlementRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSettlementRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
