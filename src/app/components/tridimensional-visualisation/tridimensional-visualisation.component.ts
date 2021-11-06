import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';

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
      for (const actor of this.tridimensionalRepresentation.getVolumes()) {
        const ctfun = vtkColorTransferFunction.newInstance();
        ctfun.addRGBPoint(-1000, 0.3, 0.3, 1);
        ctfun.addRGBPoint(-488, 0.3, 1, 0.3);
        ctfun.addRGBPoint(463.28, 1, 0, 0);
        ctfun.addRGBPoint(659.15, 1, 0.912535, 0.0374849);
        ctfun.addRGBPoint(953, 1, 0.3, 0.3);
        const ofun = vtkPiecewiseFunction.newInstance();
        ofun.addPoint(-1000, 0);
        ofun.addPoint(152.19, 0);
        ofun.addPoint(278.93, 0.190476);
        ofun.addPoint(952, 0.2);
        actor.getProperty().setRGBTransferFunction(0, ctfun);
        actor.getProperty().setScalarOpacity(0, ofun);
        actor.getProperty().setScalarOpacityUnitDistance(0, 3.0);
        actor.getProperty().setScalarOpacityUnitDistance(0, 3.0);
        actor.getProperty().setInterpolationTypeToLinear();
        actor.getProperty().setUseGradientOpacity(0, true);
        actor.getProperty().setGradientOpacityMinimumValue(0, 2);
        actor.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
        actor.getProperty().setGradientOpacityMaximumValue(0, 20);
        actor.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);
        actor.getProperty().setShade(true);
        actor.getProperty().setAmbient(0.2);
        actor.getProperty().setDiffuse(0.7);
        actor.getProperty().setSpecular(0.3);
        actor.getProperty().setSpecularPower(8.0);
      }
      this.vtkManagerService.update3D();
      this.viewProxy.render();
    });
  }

  initializeView(): void {
    this.viewProxy = this.vtkManagerService.proxyManager.createProxy('Views', 'View3D');
    this.viewProxy.setContainer(this.tridimensionalDiv.nativeElement);
    this.viewProxy.getCornerAnnotation().updateTemplates({
      nw() { return `3D`; }
    });
    this.viewProxy.resize();
  }
}

