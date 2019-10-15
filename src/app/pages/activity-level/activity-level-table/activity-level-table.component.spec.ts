import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLevelTableComponent } from './activity-level-table.component';

describe('ActivityLevelTableComponent', () => {
  let component: ActivityLevelTableComponent;
  let fixture: ComponentFixture<ActivityLevelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLevelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLevelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
