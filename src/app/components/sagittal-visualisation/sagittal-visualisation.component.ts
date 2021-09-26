import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VtkManagerService } from "../../services/vtk-manager/vtk-manager.service";

import vtkImageMapper from 'vtk.js/Sources/Rendering/Core/ImageMapper';
import vtkImageSlice from 'vtk.js/Sources/Rendering/Core/ImageSlice';

import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkInteractorStyleImage from 'vtk.js/Sources/Interaction/Style/InteractorStyleImage';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';

import vtkOrientationMarkerWidget from 'vtk.js/Sources/Interaction/Widgets/OrientationMarkerWidget';
import vtkAxesActor from 'vtk.js/Sources/Rendering/Core/AxesActor';

import vtkCornerAnnotation from 'vtk.js/Sources/Interaction/UI/CornerAnnotation';

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
  dataSource: any;
  sagittalRepresentation: any;
  viewProxy: any;

  constructor(private vtkManagerService: VtkManagerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initializeView();
    this.dataSource = this.vtkManagerService.proxySource;

    /* this.subscription = this.vtkManagerService.getSource().subscribe(source => {
      this.sagittalRepresentation = this.vtkManagerService.proxyManager.getRepresentation(this.dataSource, this.viewProxy);
      this.viewProxy.addRepresentation(this.sagittalRepresentation);
      this.viewProxy.render()
    }) */
    this.sagittalRepresentation = this.vtkManagerService.proxyManager.getRepresentation(this.dataSource, this.viewProxy);
    this.viewProxy.addRepresentation(this.sagittalRepresentation);
    this.viewProxy.render()

    console.log('Inside Sagittal AfterInit')
    console.log(this.sagittalRepresentation.getInput().getDataset());
    
    /* this.subscription = this.vtkManagerService.getData()
      .subscribe(imageData => {
        this.orientationMarker();
        this.mapper.setInputData(imageData);
        this.renderer.resetCamera();
        this.renderWindow.render();
      }),
      error => {
        console.log(error);
      } */
  }

  initializeView() {
    this.viewProxy = this.vtkManagerService.proxyManager.createProxy("Views", "SagittalView");
    this.viewProxy.setContainer(this.sagittalDiv.nativeElement);
    this.viewProxy.resize();

   /*  this.renderWindow = vtkRenderWindow.newInstance();
    this.renderer = vtkRenderer.newInstance({ background: [0, 0, 0] });
    this.renderWindow.addRenderer(this.renderer);

    this.mapper = vtkImageMapper.newInstance();
    this.mapper.setSliceAtFocalPoint(true);
    this.mapper.setSlicingMode(SlicingMode.X);

    this.actor = vtkImageSlice.newInstance();
    this.actor.setMapper(this.mapper);
    this.renderer.addActor(this.actor);
    this.camera = this.renderer.getActiveCamera();
    this.camera.setParallelProjection(true);

    this.camera.yaw(-90);
    this.camera.setViewUp([0, 0, 1]);

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
    this.renderWindow.getInteractor().setInteractorStyle(this.interactor); 
    this.interactor = vtkRenderWindowInteractor.newInstance();
    this.interactor.setView(this.openglRenderWindow);
    this.interactor.initialize();
    this.interactor.bindEvents(this.sagittalDiv.nativeElement);


    const iStyle = vtkInteractorStyleImage.newInstance();
    iStyle.setInteractionMode("IMAGE_SLICING");
    this.interactor.setInteractorStyle(iStyle);

    this.addAnnotations(); */
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
      nw() { return `Sagittal`; }
    });
  }
}
