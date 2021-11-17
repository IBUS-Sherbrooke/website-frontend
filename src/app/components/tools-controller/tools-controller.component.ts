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
  @ViewChild('windowLevel') windowLevel;
  @ViewChild('windowWidth') windowWidth;
  constructor(private vtkManagerService: VtkManagerService) { }

  ngOnInit(): void {
    this.vtkManagerService.getWindow().subscribe(p => {
      const levelDomain = p.getPropertyDomainByName('windowLevel');
      const widthDomain = p.getPropertyDomainByName('windowWidth');
      this.canUpdate = false;
      (document.getElementById('windowLevel') as any).value = 1 - (p.getWindowLevel() - levelDomain.min) /
        (levelDomain.max - levelDomain.min);
      (document.getElementById('windowWidth') as any).value = (p.getWindowWidth() - widthDomain.min) / (widthDomain.max - widthDomain.min);
      this.canUpdate = true;
    });
  }

  flipViews(): void {
    this.vtkManagerService.flipViewsProxy();
  }

  setCropping(axis, bound, value): void {
    this.vtkManagerService.setCropping(axis, bound, value);
  }

  setWindowLevel(percent): void {
    if (this.canUpdate) {
      this.vtkManagerService.setWindowLevel(1 - percent);
    }
  }

  setWindowWidth(percent): void {
    if (this.canUpdate) {
      this.vtkManagerService.setWindowWidth(percent);
    }
  }
}
