import { TestBed } from '@angular/core/testing';

import { SıgnedInGuard } from './sıgned-in.guard';

describe('SıgnedInGuard', () => {
  let guard: SıgnedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SıgnedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
