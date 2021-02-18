import { ViewChild, ElementRef, Component, OnInit } from '@angular/core';

import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkOpenGLRenderWindow from 'vtk.js/Sources/Rendering/OpenGL/RenderWindow';
import vtkRenderWindow from 'vtk.js/Sources/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js/Sources/Rendering/Core/RenderWindowInteractor';
import vtkRenderer from 'vtk.js/Sources/Rendering/Core/Renderer';
import vtkInteractorStyleTrackballCamera from 'vtk.js/Sources/Interaction/Style/InteractorStyleTrackballCamera';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tridimensional-visualisation',
  templateUrl: './tridimensional-visualisation.component.html',
  styleUrls: ['./tridimensional-visualisation.component.css']
})
export class TridimensionalVisualisationComponent implements OnInit {

  renderWindow: any;
  renderer: any;

  openglRenderWindow: any;

  subscription: Subscription;

  @ViewChild('tridimensionalDiv', {read: ElementRef}) tridimensionalDiv: ElementRef;

  constructor(private visualisationDataService: VisualisationDataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initialiseView();
    this.subscription = this.visualisationDataService.getData()
      .subscribe(imageData => {
        /* const renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance({ background: [0.5, 0.5, 0.5] });
        renderWindow.addRenderer(renderer);

        const mapper = vtkVolumeMapper.newInstance();
        const actor = vtkVolume.newInstance();

        mapper.setInputData(imageData);
        
        actor.setMapper(mapper);
        renderer.addVolume(actor);
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

        interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance()); */
      }),
      error => {
        console.log(error);
      }
  }

  initialiseView() {
    const renderWindow = vtkRenderWindow.newInstance();
    const renderer = vtkRenderer.newInstance({ background: [0, 0, 0] });
    renderWindow.addRenderer(renderer);

    /* const mapper = vtkVolumeMapper.newInstance();
    const actor = vtkVolume.newInstance();
    
    actor.setMapper(mapper);
    renderer.addVolume(actor);
    renderer.resetCamera(); */

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

    interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());
  }
}

