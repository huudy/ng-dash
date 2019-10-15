import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPatternComponent } from './activity-pattern.component';

describe('ActivityPatternComponent', () => {
  let component: ActivityPatternComponent;
  let fixture: ComponentFixture<ActivityPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
