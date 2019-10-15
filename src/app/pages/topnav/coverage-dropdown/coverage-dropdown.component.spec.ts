import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageDropdownComponent } from './coverage-dropdown.component';

describe('CoverageDropdownComponent', () => {
  let component: CoverageDropdownComponent;
  let fixture: ComponentFixture<CoverageDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
