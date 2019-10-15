import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentUpcomingComponent } from './recent-upcoming.component';

describe('RecentUpcomingComponent', () => {
  let component: RecentUpcomingComponent;
  let fixture: ComponentFixture<RecentUpcomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentUpcomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
