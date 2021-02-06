import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';

@Component({
  selector: 'app-tridimensional-visualisation',
  templateUrl: './tridimensional-visualisation.component.html',
  styleUrls: ['./tridimensional-visualisation.component.css']
})
export class TridimensionalVisualisationComponent implements OnInit {

  sagitallRenderWindow = null;
  sagitallRenderer = null;

  @ViewChild('tridimensionalDiv', {read: ElementRef}) tridimensionalDiv: ElementRef;

  constructor() { }

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

    openglRenderWindow.setContainer(this.tridimensionalDiv.nativeElement);

    // ----------------------------------------------------------------------------
    // Capture size of the container and set it to the renderWindow
    // ----------------------------------------------------------------------------
    const { width, height } = this.tridimensionalDiv.nativeElement.getBoundingClientRect();
    openglRenderWindow.setSize(width, height);

    // ----------------------------------------------------------------------------
    // Setup an interactor to handle mouse events
    // ----------------------------------------------------------------------------
    const interactor = vtkRenderWindowInteractor.newInstance();
    interactor.setView(openglRenderWindow);
    interactor.initialize();
    interactor.bindEvents(this.tridimensionalDiv.nativeElement);
  }
}

