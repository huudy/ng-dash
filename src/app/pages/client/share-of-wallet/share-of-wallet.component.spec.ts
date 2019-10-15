import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOfWalletComponent } from './share-of-wallet.component';

describe('ShareOfWalletComponent', () => {
  let component: ShareOfWalletComponent;
  let fixture: ComponentFixture<ShareOfWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareOfWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOfWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
