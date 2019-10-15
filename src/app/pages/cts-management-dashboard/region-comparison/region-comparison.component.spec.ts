import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionComparisonComponent } from './region-comparison.component';

describe('RegionComparisonComponent', () => {
  let component: RegionComparisonComponent;
  let fixture: ComponentFixture<RegionComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
