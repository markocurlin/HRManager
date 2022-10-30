import { TestBed } from '@angular/core/testing';

import { WorkingPlaceApiService } from './working-place-api.service';

describe('WorkingPlaceApiService', () => {
  let service: WorkingPlaceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingPlaceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
