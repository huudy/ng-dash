import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryMarketTableComponent } from './secondary-market-table.component';

describe('SecondaryMarketTableComponent', () => {
  let component: SecondaryMarketTableComponent;
  let fixture: ComponentFixture<SecondaryMarketTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryMarketTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryMarketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
