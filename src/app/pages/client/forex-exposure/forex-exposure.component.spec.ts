import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexExposureComponent } from './forex-exposure.component';

describe('ForexExposureComponent', () => {
  let component: ForexExposureComponent;
  let fixture: ComponentFixture<ForexExposureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexExposureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
