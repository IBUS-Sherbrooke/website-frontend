import { TestBed } from '@angular/core/testing';

import { FileDbUploadService } from './file-db-upload.service';

describe('FileDbUploadService', () => {
  let service: FileDbUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDbUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
