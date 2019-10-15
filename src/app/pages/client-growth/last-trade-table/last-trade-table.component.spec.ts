import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTradeTableComponent } from './last-trade-table.component';

describe('LastTradeTableComponent', () => {
  let component: LastTradeTableComponent;
  let fixture: ComponentFixture<LastTradeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastTradeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastTradeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
