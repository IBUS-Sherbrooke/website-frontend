import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileConversionComponent } from './file-conversion.component';

describe('FileConversionComponent', () => {
  let component: FileConversionComponent;
  let fixture: ComponentFixture<FileConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
