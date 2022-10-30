import { TestBed } from '@angular/core/testing';

import { AuthContextApiService } from './authcontext-api.service';

describe('AuthcontextApiService', () => {
  let service: AuthContextApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthContextApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});