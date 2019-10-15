import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEarningsTableComponent } from './client-earnings-table.component';

describe('ClientEarningsTableComponent', () => {
  let component: ClientEarningsTableComponent;
  let fixture: ComponentFixture<ClientEarningsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientEarningsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientEarningsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
