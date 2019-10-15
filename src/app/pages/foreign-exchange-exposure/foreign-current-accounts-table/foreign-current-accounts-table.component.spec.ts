import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignCurrentAccountsTableComponent } from './foreign-current-accounts-table.component';

describe('ForeignCurrentAccountsTableComponent', () => {
  let component: ForeignCurrentAccountsTableComponent;
  let fixture: ComponentFixture<ForeignCurrentAccountsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignCurrentAccountsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignCurrentAccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
