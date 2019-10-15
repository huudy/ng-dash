import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturingQuotesTableComponent } from './maturing-quotes-table.component';

describe('MaturingQuotesTableComponent', () => {
  let component: MaturingQuotesTableComponent;
  let fixture: ComponentFixture<MaturingQuotesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturingQuotesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturingQuotesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
