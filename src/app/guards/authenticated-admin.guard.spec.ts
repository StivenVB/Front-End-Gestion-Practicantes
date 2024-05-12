import { TestBed } from '@angular/core/testing';

import { AuthenticatedAdminGuard } from './authenticated-admin.guard';

describe('AuthenticatedAdminGuard', () => {
  let guard: AuthenticatedAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticatedAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
