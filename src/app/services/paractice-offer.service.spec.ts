import { TestBed } from '@angular/core/testing';

import { ParacticeOfferService } from './paractice-offer.service';

describe('ParacticeOfferService', () => {
  let service: ParacticeOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParacticeOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
