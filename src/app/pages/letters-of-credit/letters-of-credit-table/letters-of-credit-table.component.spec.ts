import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersOfCreditTableComponent } from './letters-of-credit-table.component';

describe('LettersOfCreditTableComponent', () => {
  let component: LettersOfCreditTableComponent;
  let fixture: ComponentFixture<LettersOfCreditTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersOfCreditTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersOfCreditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
