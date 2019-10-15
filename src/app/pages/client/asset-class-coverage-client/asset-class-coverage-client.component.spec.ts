import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetClassCoverageClientComponent } from './asset-class-coverage-client.component';

describe('AssetClassCoverageClientComponent', () => {
  let component: AssetClassCoverageClientComponent;
  let fixture: ComponentFixture<AssetClassCoverageClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetClassCoverageClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetClassCoverageClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
