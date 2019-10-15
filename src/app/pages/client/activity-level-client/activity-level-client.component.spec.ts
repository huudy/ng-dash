import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLevelClientComponent } from './activity-level-client.component';

describe('ActivityLevelClientComponent', () => {
  let component: ActivityLevelClientComponent;
  let fixture: ComponentFixture<ActivityLevelClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLevelClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLevelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
