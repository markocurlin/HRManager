import { TestBed } from '@angular/core/testing';

import { EducationDegreeApiService } from './education-degree-api.service';

describe('EducationDegreeApiService', () => {
  let service: EducationDegreeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationDegreeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});