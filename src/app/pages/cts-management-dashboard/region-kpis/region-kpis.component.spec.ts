import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionKpisComponent } from './region-kpis.component';

describe('RegionKpisComponent', () => {
  let component: RegionKpisComponent;
  let fixture: ComponentFixture<RegionKpisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionKpisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
