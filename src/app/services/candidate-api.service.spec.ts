import { TestBed } from '@angular/core/testing';

import { CandidateApiService } from './candidate-api.service';

describe('CandidateApiService', () => {
  let service: CandidateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});