import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusualTradesComponent } from './unusual-trades.component';

describe('UnusualTradesComponent', () => {
  let component: UnusualTradesComponent;
  let fixture: ComponentFixture<UnusualTradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnusualTradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusualTradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
