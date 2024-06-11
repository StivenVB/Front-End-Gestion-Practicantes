import { TestBed } from '@angular/core/testing';

import { VirtualLibraryService } from './virtual-library.service';

describe('VirtualLibraryService', () => {
  let service: VirtualLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
