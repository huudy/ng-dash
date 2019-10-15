import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexMarkupHeatmapComponent } from './forex-markup-heatmap.component';

describe('ForexMarkupHeatmapComponent', () => {
  let component: ForexMarkupHeatmapComponent;
  let fixture: ComponentFixture<ForexMarkupHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexMarkupHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexMarkupHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
