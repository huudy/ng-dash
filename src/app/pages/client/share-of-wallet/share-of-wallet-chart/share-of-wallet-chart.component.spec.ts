import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOfWalletChartComponent } from './share-of-wallet-chart.component';

describe('ShareOfWalletChartComponent', () => {
  let component: ShareOfWalletChartComponent;
  let fixture: ComponentFixture<ShareOfWalletChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareOfWalletChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOfWalletChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
