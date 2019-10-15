import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantItemComponent } from './important-item.component';

describe('ImportantItemComponent', () => {
  let component: ImportantItemComponent;
  let fixture: ComponentFixture<ImportantItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
