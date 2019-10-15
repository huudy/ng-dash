import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCapitalTableComponent } from './free-capital-table.component';

describe('FreeCapitalTableComponent', () => {
  let component: FreeCapitalTableComponent;
  let fixture: ComponentFixture<FreeCapitalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeCapitalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCapitalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
