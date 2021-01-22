import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransverseVisualisationComponent } from './transverse-visualisation.component';

describe('TransverseVisualisationComponent', () => {
  let component: TransverseVisualisationComponent;
  let fixture: ComponentFixture<TransverseVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransverseVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransverseVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
