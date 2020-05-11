import { TestBed } from '@angular/core/testing';

import { LoginStateService } from './login-state.service';

describe('LoginStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginStateService = TestBed.get(LoginStateService);
    expect(service).toBeTruthy();
  });
});
