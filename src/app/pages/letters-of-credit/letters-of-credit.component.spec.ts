import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersOfCreditComponent } from './letters-of-credit.component';

describe('LettersOfCreditComponent', () => {
  let component: LettersOfCreditComponent;
  let fixture: ComponentFixture<LettersOfCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersOfCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersOfCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
