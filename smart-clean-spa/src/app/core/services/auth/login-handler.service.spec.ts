import { TestBed, inject } from '@angular/core/testing';

import { LoginHandlerService } from './login-handler.service';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';
import { HttpClientTestingModule } from '../../../../../node_modules/@angular/common/http/testing';

describe('LoginHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginHandlerService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([LoginHandlerService], (service: LoginHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
