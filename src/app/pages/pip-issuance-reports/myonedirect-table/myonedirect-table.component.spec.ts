import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyonedirectTableComponent } from './myonedirect-table.component';

describe('MyonedirectTableComponent', () => {
  let component: MyonedirectTableComponent;
  let fixture: ComponentFixture<MyonedirectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyonedirectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyonedirectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
