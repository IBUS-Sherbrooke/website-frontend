import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItkTestComponent } from './itk-test.component';

describe('ItkTestComponent', () => {
  let component: ItkTestComponent;
  let fixture: ComponentFixture<ItkTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItkTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItkTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
