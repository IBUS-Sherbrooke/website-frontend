import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronalVisualisationComponent } from './coronal-visualisation.component';

describe('CoronalVisualisationComponent', () => {
  let component: CoronalVisualisationComponent;
  let fixture: ComponentFixture<CoronalVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoronalVisualisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronalVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
