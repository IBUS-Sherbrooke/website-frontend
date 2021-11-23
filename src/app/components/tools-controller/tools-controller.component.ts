import { ViewChild, Component, OnInit } from '@angular/core';
import { domain } from 'process';
import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

@Component({
  selector: 'app-tools-controller',
  templateUrl: './tools-controller.component.html',
  styleUrls: ['./tools-controller.component.css']
})
export class ToolsControllerComponent implements OnInit {
  canUpdate = true;
  widthValue: number = 0.5;
  levelValue: number = 0.5;
  xLowBound: number = 0;
  xHighBound: number = 1;
  yLowBound: number = 0;
  yHighBound: number = 1;
  zLowBound: number = 0;
  zHighBound: number = 1;
  @ViewChild('windowLevel') windowLevel;
  @ViewChild('windowWidth') windowWidth;
  constructor(private vtkManagerService: VtkManagerService) { }

  ngOnInit(): void {
    this.vtkManagerService.getWindow().subscribe(p => {
      const levelDomain = p.getPropertyDomainByName('windowLevel');
      const widthDomain = p.getPropertyDomainByName('windowWidth');
      this.canUpdate = false;
      this.levelValue = 1 - (p.getWindowLevel() - levelDomain.min) /
        (levelDomain.max - levelDomain.min);
      this.widthValue = (p.getWindowWidth() - widthDomain.min) / (widthDomain.max - widthDomain.min);
      this.canUpdate = true;
    });
  }

  flipViews(): void {
    this.vtkManagerService.flipViewsProxy();
  }


  setWindowLevel(event: any): void {
    if (this.canUpdate) {
      this.vtkManagerService.setWindowLevel(1 - event.value);
    }
  }
 
  setCropping(axis, bound, value): void {
    this.vtkManagerService.setCropping(axis, bound, value);
  }
  
  setWindowWidth(event: any): void {
    if (this.canUpdate) {
      this.vtkManagerService.setWindowWidth(event.value);
    }
  }
}
