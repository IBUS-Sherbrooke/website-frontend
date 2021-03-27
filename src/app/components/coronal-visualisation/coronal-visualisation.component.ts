import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";

import vtkImageMapper from 'vtk.js/Sources/Rendering/Core/ImageMapper';
import vtkImageSlice from 'vtk.js/Sources/Rendering/Core/ImageSlice';
import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkInteractorStyleImage from 'vtk.js/Sources/Interaction/Style/InteractorStyleImage';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';
import Constants from 'vtk.js/Sources/Rendering/Core/ImageMapper/Constants';

import vtkCornerAnnotation from 'vtk.js/Sources/Interaction/UI/CornerAnnotation';

import vtkOrientationMarkerWidget from 'vtk.js/Sources/Interaction/Widgets/OrientationMarkerWidget';
import vtkAxesActor from 'vtk.js/Sources/Rendering/Core/AxesActor';

import { Subscription } from 'rxjs';

const { SlicingMode } = Constants;

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
        this.renderWindow.getViewProps();
      }),
      error => {
        console.log(error);
      }
  }

  initializeView() {
    this.renderWindow = vtkRenderWindow.newInstance();
    this.renderer = vtkRenderer.newInstance({ background: [0, 0, 0] });
    this.renderWindow.addRenderer(this.renderer);

    this.mapper = vtkImageMapper.newInstance();
    this.mapper.setSliceAtFocalPoint(true);
    this.mapper.setSlicingMode(SlicingMode.Y);

    this.actor = vtkImageSlice.newInstance();
    this.actor.setMapper(this.mapper);
    this.renderer.addActor(this.actor);
    this.camera = this.renderer.getActiveCamera();   
    this.camera.setParallelProjection(true);

    this.camera.pitch(90);
    this.camera.setViewUp([0, 1, 0]);
    
    this.openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
    this.renderWindow.addView(this.openglRenderWindow);

    this.openglRenderWindow.setContainer(this.coronalDiv.nativeElement);

    // ----------------------------------------------------------------------------
    // Capture size of the container and set it to the renderWindow
    // ----------------------------------------------------------------------------
    const { width, height } = this.coronalDiv.nativeElement.getBoundingClientRect();
    this.openglRenderWindow.setSize(width, height);

    // ----------------------------------------------------------------------------
    // Setup an interactor to handle mouse events
    // ----------------------------------------------------------------------------
    this.interactor = vtkRenderWindowInteractor.newInstance();
    this.interactor.setView(this.openglRenderWindow);
    this.interactor.initialize();
    this.interactor.bindEvents(this.coronalDiv.nativeElement);

    const iStyle = vtkInteractorStyleImage.newInstance();
    iStyle.setInteractionMode("IMAGE_SLICING");
    this.interactor.setInteractorStyle(iStyle);

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
      nw() { return `Coronal`; }
    });
  }
}
