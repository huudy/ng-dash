import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertCardComponent } from './custom-alert-card.component';

describe('CustomAlertCardComponent', () => {
  let component: CustomAlertCardComponent;
  let fixture: ComponentFixture<CustomAlertCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomAlertCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAlertCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
