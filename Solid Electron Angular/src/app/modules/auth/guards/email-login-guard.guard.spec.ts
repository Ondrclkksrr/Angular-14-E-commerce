import { TestBed } from '@angular/core/testing';

import { EmailLoginGuardGuard } from './email-login-guard.guard';

describe('EmailLoginGuardGuard', () => {
  let guard: EmailLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmailLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
