import { TestBed } from '@angular/core/testing';

import { VtkManagerService } from './vtk-manager.service';

describe('VtkManagerService', () => {
  let service: VtkManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VtkManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
