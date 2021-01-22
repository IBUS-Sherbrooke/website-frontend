import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SagittalVisualisationComponent } from './sagittal-visualisation.component';

describe('SagittalVisualisationComponent', () => {
  let component: SagittalVisualisationComponent;
  let fixture: ComponentFixture<SagittalVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SagittalVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SagittalVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
