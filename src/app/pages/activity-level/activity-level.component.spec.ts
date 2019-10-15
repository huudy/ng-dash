import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLevelComponent } from './activity-level.component';

describe('ActivityLevelComponent', () => {
  let component: ActivityLevelComponent;
  let fixture: ComponentFixture<ActivityLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
