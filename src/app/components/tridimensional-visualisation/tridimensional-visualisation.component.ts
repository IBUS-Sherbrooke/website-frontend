import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VisualisationDataService } from '../../services/visualisation-Data/visualisation-data.service';
import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';
import vtkInteractorStyleTrackballCamera from 'vtk.js/Sources/Interaction/Style/InteractorStyleTrackballCamera';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';

import vtkCornerAnnotation from 'vtk.js/Sources/Interaction/UI/CornerAnnotation';

import vtkOrientationMarkerWidget from 'vtk.js/Sources/Interaction/Widgets/OrientationMarkerWidget';
import vtkAxesActor from 'vtk.js/Sources/Rendering/Core/AxesActor';

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
    this.viewProxy.setCornerAnnotation(vtkOrientationMarkerWidget.Corners.TOP_LEFT, {
      nw() { return `3D`; }
    });
    this.viewProxy.updateCornerAnnotation();
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

  orientationMarker() {
    const axes = vtkAxesActor.newInstance();
    const orientationWidget = vtkOrientationMarkerWidget.newInstance({
      actor: axes,
      interactor: this.interactor,
    });
    orientationWidget.setEnabled(true);
    orientationWidget.setViewportCorner(
      vtkOrientationMarkerWidget.Corners.BOTTOM_LEFT
    );
    orientationWidget.setViewportSize(0.15);
    orientationWidget.setMinPixelSize(100);
    orientationWidget.setMaxPixelSize(300);
  }

  addAnnotations() {
    // Add corner annotation
    const cornerAnnotation = vtkCornerAnnotation.newInstance();
    cornerAnnotation.getAnnotationContainer().style.color = 'white';
    /* cornerAnnotation.updateMetadata(); */
    cornerAnnotation.updateTemplates({
      nw() { return `3D`; }
    });
    return cornerAnnotation;
  }
}

