import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';

@Component({
  selector: 'app-transverse-visualisation',
  templateUrl: './transverse-visualisation.component.html',
  styleUrls: ['./transverse-visualisation.component.css']
})
export class TransverseVisualisationComponent implements OnInit {

  sagitallRenderWindow = null;
  sagitallRenderer = null;

  @ViewChild('transverseDiv', {read: ElementRef}) transverseDiv: ElementRef;

  constructor(private visualisationDataService: VisualisationDataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const renderWindow = vtkRenderWindow.newInstance();
    const renderer = vtkRenderer.newInstance({ background: [0, 0, 0] });
    renderWindow.addRenderer(renderer);

    const mapper = vtkMapper.newInstance();
    const actor = vtkActor.newInstance();

    actor.setMapper(mapper);
    renderer.addActor(actor);
    renderer.resetCamera();

    const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
    renderWindow.addView(openglRenderWindow);

    openglRenderWindow.setContainer(this.transverseDiv.nativeElement);

    // ----------------------------------------------------------------------------
    // Capture size of the container and set it to the renderWindow
    // ----------------------------------------------------------------------------
    const { width, height } = this.transverseDiv.nativeElement.getBoundingClientRect();
    openglRenderWindow.setSize(width, height);

    // ----------------------------------------------------------------------------
    // Setup an interactor to handle mouse events
    // ----------------------------------------------------------------------------
    const interactor = vtkRenderWindowInteractor.newInstance();
    interactor.setView(openglRenderWindow);
    interactor.initialize();
    interactor.bindEvents(this.transverseDiv.nativeElement);
  }
}
