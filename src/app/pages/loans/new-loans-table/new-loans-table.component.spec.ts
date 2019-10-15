import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoansTableComponent } from './new-loans-table.component';

describe('NewLoansTableComponent', () => {
  let component: NewLoansTableComponent;
  let fixture: ComponentFixture<NewLoansTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLoansTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLoansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
