import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexTableComponent } from './forex-table.component';

describe('ForexTableComponent', () => {
  let component: ForexTableComponent;
  let fixture: ComponentFixture<ForexTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
