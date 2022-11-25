import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SignOutEffects } from './sign-out.effects';

describe('SignOutEffects', () => {
  let actions$: Observable<any>;
  let effects: SignOutEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignOutEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SignOutEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
