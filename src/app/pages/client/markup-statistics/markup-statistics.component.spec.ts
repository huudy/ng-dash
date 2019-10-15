import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkupStatisticsComponent } from './markup-statistics.component';

describe('MarkupStatisticsComponent', () => {
  let component: MarkupStatisticsComponent;
  let fixture: ComponentFixture<MarkupStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkupStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkupStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
