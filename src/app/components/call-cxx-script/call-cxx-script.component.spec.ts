import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCxxScriptComponent } from './call-cxx-script.component';

describe('CallCxxScriptComponent', () => {
  let component: CallCxxScriptComponent;
  let fixture: ComponentFixture<CallCxxScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallCxxScriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCxxScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
