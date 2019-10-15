import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGrowthComponent } from './client-growth.component';

describe('ClientGrowthComponent', () => {
  let component: ClientGrowthComponent;
  let fixture: ComponentFixture<ClientGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
