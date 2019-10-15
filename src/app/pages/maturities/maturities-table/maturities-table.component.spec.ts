import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturitiesTableComponent } from './maturities-table.component';

describe('MaturitiesTableComponent', () => {
  let component: MaturitiesTableComponent;
  let fixture: ComponentFixture<MaturitiesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturitiesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
