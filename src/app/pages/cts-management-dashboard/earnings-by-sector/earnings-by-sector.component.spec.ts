import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsBySectorComponent } from './earnings-by-sector.component';

describe('EarningsBySectorComponent', () => {
  let component: EarningsBySectorComponent;
  let fixture: ComponentFixture<EarningsBySectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsBySectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsBySectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
