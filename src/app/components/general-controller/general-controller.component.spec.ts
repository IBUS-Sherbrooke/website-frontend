import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralControllerComponent } from './general-controller.component';

describe('GeneralControllerComponent', () => {
  let component: GeneralControllerComponent;
  let fixture: ComponentFixture<GeneralControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
