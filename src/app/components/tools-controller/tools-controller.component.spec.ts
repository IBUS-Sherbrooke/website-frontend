import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsControllerComponent } from './tools-controller.component';

describe('ToolsControllerComponent', () => {
  let component: ToolsControllerComponent;
  let fixture: ComponentFixture<ToolsControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
