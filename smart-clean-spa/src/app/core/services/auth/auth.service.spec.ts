import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '../../../../../node_modules/@angular/router/testing';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [RouterTestingModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
