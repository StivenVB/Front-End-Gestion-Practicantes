import { TestBed } from '@angular/core/testing';

import { UserRegisterService } from './user-register.service';

describe('UserService', () => {
  let service: UserRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
