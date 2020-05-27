import { TestBed } from '@angular/core/testing';

import { EmployeePickupService } from './employee-pickup.service';

describe('EmployeePickupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeePickupService = TestBed.get(EmployeePickupService);
    expect(service).toBeTruthy();
  });
});
