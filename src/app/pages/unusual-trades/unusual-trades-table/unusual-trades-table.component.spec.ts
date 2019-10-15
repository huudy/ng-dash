import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusualTradesTableComponent } from './unusual-trades-table.component';

describe('UnusualTradesTableComponent', () => {
  let component: UnusualTradesTableComponent;
  let fixture: ComponentFixture<UnusualTradesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnusualTradesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusualTradesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
