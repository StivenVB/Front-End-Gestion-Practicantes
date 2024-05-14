import { TestBed } from '@angular/core/testing';

import { PracticePostulationService } from './practice-postulation.service';

describe('PracticePostulationService', () => {
  let service: PracticePostulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticePostulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
