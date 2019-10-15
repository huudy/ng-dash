import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturingLoansTableComponent } from './maturing-loans-table.component';

describe('MaturingLoansTableComponent', () => {
  let component: MaturingLoansTableComponent;
  let fixture: ComponentFixture<MaturingLoansTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturingLoansTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturingLoansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
