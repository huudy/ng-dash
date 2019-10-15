import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeputyTableComponent } from './deputy-table.component';

describe('DeputyTableComponent', () => {
  let component: DeputyTableComponent;
  let fixture: ComponentFixture<DeputyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeputyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeputyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
