import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaLinkComponent } from './dia-link.component';

describe('DiaLinkComponent', () => {
  let component: DiaLinkComponent;
  let fixture: ComponentFixture<DiaLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
