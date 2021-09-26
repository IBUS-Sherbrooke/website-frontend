import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';

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
  selector: 'app-transverse-visualisation',
  templateUrl: './transverse-visualisation.component.html',
  styleUrls: ['./transverse-visualisation.component.css']
})
export class TransverseVisualisationComponent implements OnInit {

  // VTK attributes
  renderWindow: any;
  renderer: any;
  camera: any
  interactor: any;
  actor: any;
  mapper: any;
  openglRenderWindow: any;

  subscription: Subscription;

  @ViewChild('transverseDiv', {read: ElementRef}) transverseDiv: ElementRef;

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
    this.viewProxy = this.vtkManagerService.proxyManager.createProxy('Views', 'TransverseView');
    this.viewProxy.setContainer(this.transverseDiv.nativeElement);
    this.viewProxy.resize();
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
      nw() { return `Transverse`; }
    });
  }
}
