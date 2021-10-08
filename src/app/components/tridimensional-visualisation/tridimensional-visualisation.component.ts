import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tridimensional-visualisation',
  templateUrl: './tridimensional-visualisation.component.html',
  styleUrls: ['./tridimensional-visualisation.component.css']
})
export class TridimensionalVisualisationComponent implements OnInit {

  // VTK attributes
  renderWindow: any;
  renderer: any;
  camera: any;
  interactor: any;
  actor: any;
  mapper: any;
  openglRenderWindow: any;

  subscription: Subscription;
  dataSource: any;
  tridimensionalRepresentation: any;
  viewProxy: any;

  @ViewChild('tridimensionalDiv', {read: ElementRef}) tridimensionalDiv: ElementRef;

  constructor(private vtkManagerService: VtkManagerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeView();

    this.dataSource = this.vtkManagerService.proxySource;

    this.subscription = this.vtkManagerService.getSource().subscribe(source => {
      this.tridimensionalRepresentation = this.vtkManagerService.proxyManager.getRepresentation(source, this.viewProxy);
      this.viewProxy.addRepresentation(this.tridimensionalRepresentation);
      this.viewProxy.render();
    });
  }

  initializeView() {
    this.viewProxy = this.vtkManagerService.proxyManager.createProxy('Views', 'View3D');
    this.viewProxy.setContainer(this.tridimensionalDiv.nativeElement);
    this.viewProxy.getCornerAnnotation().updateTemplates({
      nw() { return `3D`; }
    });
    this.viewProxy.resize();
/*
    this.viewProxy.volume.getProperty().setScalarOpacityUnitDistance(0, 3.0);
    this.viewProxy.volume.getProperty().setInterpolationTypeToLinear();
    this.viewProxy.volume.getProperty().setUseGradientOpacity(0, true);
    this.viewProxy.volume.getProperty().setGradientOpacityMinimumValue(0, 2);
    this.viewProxy.volume.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
    this.viewProxy.volume.getProperty().setGradientOpacityMaximumValue(0, 20);
    this.viewProxy.volume.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);*/
  }
}

