import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DericonTableComponent } from './dericon-table.component';

describe('DericonTableComponent', () => {
  let component: DericonTableComponent;
  let fixture: ComponentFixture<DericonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DericonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DericonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
