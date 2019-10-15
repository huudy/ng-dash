import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioKpisComponent } from './portfolio-kpis.component';

describe('PortfolioKpisComponent', () => {
  let component: PortfolioKpisComponent;
  let fixture: ComponentFixture<PortfolioKpisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioKpisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
