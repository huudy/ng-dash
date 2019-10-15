import { TestBed, inject } from '@angular/core/testing';

import { ContextManagerService } from './context-manager.service';

describe('ContextManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextManagerService]
    });
  });

  it('should be created', inject([ContextManagerService], (service: ContextManagerService) => {
    expect(service).toBeTruthy();
  }));
});
