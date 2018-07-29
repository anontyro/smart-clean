import { TestBed, inject } from '@angular/core/testing';

import { LoginHandlerService } from './login-handler.service';

describe('LoginHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginHandlerService]
    });
  });

  it('should be created', inject([LoginHandlerService], (service: LoginHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
