import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TridimensionalVisualisationComponent } from './tridimensional-visualisation.component';

describe('TridimensionalVisualisationComponent', () => {
  let component: TridimensionalVisualisationComponent;
  let fixture: ComponentFixture<TridimensionalVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TridimensionalVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TridimensionalVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
