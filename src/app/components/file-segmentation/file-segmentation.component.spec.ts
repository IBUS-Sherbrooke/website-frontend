import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSegmentationComponent } from './file-segmentation.component';

describe('FileSegmentationComponent', () => {
  let component: FileSegmentationComponent;
  let fixture: ComponentFixture<FileSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSegmentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
