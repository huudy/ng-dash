import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyonemarketsTableComponent } from './myonemarkets-table.component';

describe('MyonemarketsTableComponent', () => {
  let component: MyonemarketsTableComponent;
  let fixture: ComponentFixture<MyonemarketsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyonemarketsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyonemarketsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
