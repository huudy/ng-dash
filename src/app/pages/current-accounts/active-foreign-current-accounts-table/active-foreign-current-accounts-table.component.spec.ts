import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveForeignCurrentAccountsTableComponent } from './active-foreign-current-accounts-table.component';

describe('ActiveForeignCurrentAccountsTableComponent', () => {
  let component: ActiveForeignCurrentAccountsTableComponent;
  let fixture: ComponentFixture<ActiveForeignCurrentAccountsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveForeignCurrentAccountsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveForeignCurrentAccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
