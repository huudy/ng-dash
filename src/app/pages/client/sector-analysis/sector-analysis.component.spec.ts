import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorAnalysisComponent } from './sector-analysis.component';

describe('SectorAnalysisComponent', () => {
  let component: SectorAnalysisComponent;
  let fixture: ComponentFixture<SectorAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
