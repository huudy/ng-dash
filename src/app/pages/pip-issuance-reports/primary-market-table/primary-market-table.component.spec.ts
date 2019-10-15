import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryMarketTableComponent } from './primary-market-table.component';

describe('PrimaryMarketTableComponent', () => {
  let component: PrimaryMarketTableComponent;
  let fixture: ComponentFixture<PrimaryMarketTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryMarketTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryMarketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
