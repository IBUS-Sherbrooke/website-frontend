import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintStatusPageComponent } from './print-status-page.component';

describe('PrintStatusPageComponent', () => {
  let component: PrintStatusPageComponent;
  let fixture: ComponentFixture<PrintStatusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintStatusPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
