import { Component, OnInit } from '@angular/core';
import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

@Component({
  selector: 'app-tools-controller',
  templateUrl: './tools-controller.component.html',
  styleUrls: ['./tools-controller.component.css']
})
export class ToolsControllerComponent implements OnInit {

  constructor(private vtkManagerService: VtkManagerService) { }

  ngOnInit(): void {
  }

  flipViews(): void {
    this.vtkManagerService.flipViewsProxy();
  }
}
