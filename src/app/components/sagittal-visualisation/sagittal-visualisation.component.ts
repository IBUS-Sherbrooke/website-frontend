import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";

import vtkImageMapper from 'vtk.js/Sources/Rendering/Core/ImageMapper';
import vtkImageSlice from 'vtk.js/Sources/Rendering/Core/ImageSlice';

import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkInteractorStyleImage from 'vtk.js/Sources/Interaction/Style/InteractorStyleImage';
import vtkInteractorStyleTrackballCamera from 'vtk.js/Sources/Interaction/Style/InteractorStyleTrackballCamera';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';

import Constants from 'vtk.js/Sources/Rendering/Core/ImageMapper/Constants';

import { Subscription } from 'rxjs';

const { SlicingMode } = Constants;

@Component({
  selector: 'app-sagittal-visualisation',
  templateUrl: './sagittal-visualisation.component.html',
  styleUrls: ['./sagittal-visualisation.component.css']
})
export class SagittalVisualisationComponent implements OnInit {

  sagitallRenderWindow = null;
  sagitallRenderer = null;

  @ViewChild('sagittalDiv', {read: ElementRef}) sagittalDiv: ElementRef;

  // VTK attributes
  renderWindow: any;
  renderer: any;
  camera: any;
  interactor: any;
  actor: any;
  mapper: any;
  openglRenderWindow: any;

  subscription: Subscription;

  constructor(private visualisationDataService: VisualisationDataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeView();
    this.subscription = this.visualisationDataService.getData()
      .subscribe(imageData => {
        this.mapper.setInputData(imageData);
        this.renderer.resetCamera();
        this.renderWindow.render();
      }),
      error => {
        console.log(error);
      }
  }

  initializeView() {
    this.renderWindow = vtkRenderWindow.newInstance();
    this.renderer = vtkRenderer.newInstance({ background: [0, 0, 0] });
    this.renderWindow.addRenderer(this.renderer);

    this.actor = vtkImageSlice.newInstance();
    this.mapper = vtkImageMapper.newInstance();
    this.mapper.setSliceAtFocalPoint(true);
    this.mapper.setXSlice(70);

    
    this.actor.setMapper(this.mapper);
    this.renderer.addActor(this.actor);
    this.camera = this.renderer.getActiveCamera();

    this.camera.yaw(-90);
    this.camera.setViewUp([0, 0, 1]);

    this.camera.setParallelProjection(true);
    this.renderer.resetCameraClippingRange();
    this.renderer.resetCamera();

    this.openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
    this.renderWindow.addView(this.openglRenderWindow);

    this.openglRenderWindow.setContainer(this.sagittalDiv.nativeElement);

    // ----------------------------------------------------------------------------
    // Capture size of the container and set it to the renderWindow
    // ----------------------------------------------------------------------------
    const { width, height } = this.sagittalDiv.nativeElement.getBoundingClientRect();
    this.openglRenderWindow.setSize(width, height);

    // ----------------------------------------------------------------------------
    // Setup an interactor to handle mouse events
    // ----------------------------------------------------------------------------
    /* this.interactor = vtkInteractorStyleImage.newInstance();
    this.interactor.setInteractionMode("IMAGE_SLICING");
    this.renderWindow.getInteractor().setInteractorStyle(this.interactor); */

    this.interactor = vtkRenderWindowInteractor.newInstance();
    this.interactor.setView(this.openglRenderWindow);
    this.interactor.initialize();
    this.interactor.bindEvents(this.sagittalDiv.nativeElement);

    //this.interactor.setInteractionMode("IMAGE_SLICING");
    //this.interactor.setInteractorStyle(vtkInteractorStyleImage.newInstance("IMAGE_SLICING"));
    this.interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());
  }
}
