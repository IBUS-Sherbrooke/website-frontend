import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleGetRequestComponent } from './sample-get-request.component';

describe('SampleGetRequestComponent', () => {
  let component: SampleGetRequestComponent;
  let fixture: ComponentFixture<SampleGetRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleGetRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleGetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
