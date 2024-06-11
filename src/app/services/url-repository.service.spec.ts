import { TestBed } from '@angular/core/testing';

import { UrlRepositoryService } from './url-repository.service';

describe('UrlRepositoryService', () => {
  let service: UrlRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
