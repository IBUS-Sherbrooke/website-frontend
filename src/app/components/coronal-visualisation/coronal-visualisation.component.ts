import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-coronal-visualisation',
  templateUrl: './coronal-visualisation.component.html',
  styleUrls: ['./coronal-visualisation.component.css']
})
export class CoronalVisualisationComponent implements OnInit{

  // VTK attributes
  renderWindow: any;
  renderer: any;
  camera: any;
  interactor: any;
  actor: any;
  mapper: any;
  openglRenderWindow: any;

  subscription: Subscription;

  @ViewChild('coronalDiv', {read: ElementRef}) coronalDiv: ElementRef;

  dataSource: any;
  sagittalRepresentation: any;
  viewProxy: any;
  representation: any;

  constructor(private vtkManagerService: VtkManagerService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initializeView();

    this.dataSource = this.vtkManagerService.proxySource;

    this.subscription = this.vtkManagerService.getSource().subscribe(source => {
      this.representation = this.vtkManagerService.proxyManager.getRepresentation(source, this.viewProxy);
      this.viewProxy.addRepresentation(this.representation);
      this.viewProxy.render();
    });
  }

  initializeView() {
    this.viewProxy = this.vtkManagerService.proxyManager.createProxy('Views', 'CoronalView');
    this.viewProxy.setContainer(this.coronalDiv.nativeElement);
    this.viewProxy.getCornerAnnotation().updateTemplates({
      nw() { return `Coronal`; }
    });
    this.viewProxy.resize();
  }
}
