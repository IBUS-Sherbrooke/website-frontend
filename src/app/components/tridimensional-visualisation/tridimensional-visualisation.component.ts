import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";

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

  @ViewChild('tridimensionalDiv', {read: ElementRef}) tridimensionalDiv: ElementRef;

  constructor(private visualisationDataService: VisualisationDataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeView();
    this.subscription = this.visualisationDataService.getData()
      .subscribe(imageData => {
        this.orientationMarker();
        this.mapper.setInputData(imageData);
        this.renderer.resetCamera();
        this.renderWindow.render();
        console.log("camera" + this.camera.getPosition());
      }),
      error => {
        console.log(error);
      }
  }

  initializeView() {
    this.renderWindow = vtkRenderWindow.newInstance();
    this.renderer = vtkRenderer.newInstance({ background: [0.5, 0.5, 0.5] });
    this.renderWindow.addRenderer(this.renderer);

    this.camera = this.renderer.getActiveCamera();

    this.mapper = vtkVolumeMapper.newInstance();
    this.actor = vtkVolume.newInstance();
    
    this.actor.setMapper(this.mapper);
    this.renderer.addVolume(this.actor);
    this.renderer.resetCamera();
    this.camera.pitch(90);

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
    this.actor.getProperty().setRGBTransferFunction(0, ctfun);
    this.actor.getProperty().setScalarOpacity(0, ofun);
    this.actor.getProperty().setScalarOpacityUnitDistance(0, 3.0);
    this.actor.getProperty().setInterpolationTypeToLinear();
    this.actor.getProperty().setUseGradientOpacity(0, true);
    this.actor.getProperty().setGradientOpacityMinimumValue(0, 2);
    this.actor.getProperty().setGradientOpacityMinimumOpacity(0, 0.0);
    this.actor.getProperty().setGradientOpacityMaximumValue(0, 20);
    this.actor.getProperty().setGradientOpacityMaximumOpacity(0, 1.0);
    this.actor.getProperty().setShade(true);
    this.actor.getProperty().setAmbient(0.2);
    this.actor.getProperty().setDiffuse(0.7);
    this.actor.getProperty().setSpecular(0.3);
    this.actor.getProperty().setSpecularPower(8.0);

    this.openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
    this.renderWindow.addView(this.openglRenderWindow);

    this.openglRenderWindow.setContainer(this.tridimensionalDiv.nativeElement);

    // Capture size of the container and set it to the renderWindow
    const { width, height } = this.tridimensionalDiv.nativeElement.getBoundingClientRect();
    this.openglRenderWindow.setSize(width, height);

    // Setup an interactor to handle mouse events
    this.interactor = vtkRenderWindowInteractor.newInstance();
    this.interactor.setView(this.openglRenderWindow);
    this.interactor.initialize();
    this.interactor.bindEvents(this.tridimensionalDiv.nativeElement);

    this.interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

    this.addAnnotations();
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
    cornerAnnotation.setContainer(this.openglRenderWindow.getContainer());
    cornerAnnotation.getAnnotationContainer().style.color = 'white';
    /* cornerAnnotation.updateMetadata(); */
    cornerAnnotation.updateTemplates({
      nw() { return `3D`; }
    });
  }
}

