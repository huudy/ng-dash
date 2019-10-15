import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedClientCardComponent } from './suggested-client-card.component';

describe('SuggestedClientCardComponent', () => {
  let component: SuggestedClientCardComponent;
  let fixture: ComponentFixture<SuggestedClientCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedClientCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedClientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
