import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexMarkupComponent } from './forex-markup.component';

describe('ForexMarkupComponent', () => {
  let component: ForexMarkupComponent;
  let fixture: ComponentFixture<ForexMarkupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForexMarkupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForexMarkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
