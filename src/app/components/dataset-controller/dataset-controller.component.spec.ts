import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetControllerComponent } from './dataset-controller.component';

describe('DatasetControllerComponent', () => {
  let component: DatasetControllerComponent;
  let fixture: ComponentFixture<DatasetControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
