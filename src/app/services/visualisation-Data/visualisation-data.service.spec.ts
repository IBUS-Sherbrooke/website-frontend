import { TestBed } from '@angular/core/testing';

import { VisualisationDataService } from './visualisation-data.service';

describe('VisualisationServiceService', () => {
  let service: VisualisationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualisationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
