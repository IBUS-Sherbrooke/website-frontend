import { TestBed } from '@angular/core/testing';

import { PostSegmentationService } from './post-segmentation.service';

describe('PostSegmentationService', () => {
  let service: PostSegmentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSegmentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
