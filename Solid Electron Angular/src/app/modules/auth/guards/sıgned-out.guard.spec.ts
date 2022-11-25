import { TestBed } from '@angular/core/testing';

import { SıgnedOutGuard } from './sıgned-out.guard';

describe('SıgnedOutGuard', () => {
  let guard: SıgnedOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SıgnedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
