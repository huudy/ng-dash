import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingChannelComponent } from './trading-channel.component';

describe('TradingChannelComponent', () => {
  let component: TradingChannelComponent;
  let fixture: ComponentFixture<TradingChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradingChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
