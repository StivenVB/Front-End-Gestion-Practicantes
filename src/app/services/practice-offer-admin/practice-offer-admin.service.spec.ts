import { TestBed } from '@angular/core/testing';

import { PracticeOfferAdminService } from './practice-offer-admin.service';

describe('PracticeOfferAdminService', () => {
  let service: PracticeOfferAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeOfferAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
