import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnutilizedLineTableComponent } from './unutilized-line-table.component';

describe('UnutilizedLineTableComponent', () => {
  let component: UnutilizedLineTableComponent;
  let fixture: ComponentFixture<UnutilizedLineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnutilizedLineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnutilizedLineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
