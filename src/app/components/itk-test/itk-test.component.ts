import { Component, OnInit } from '@angular/core';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import convertItkToVtkImage from "vtk.js/Sources/Common/DataModel/ITKHelper";
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';


@Component({
  selector: 'app-itk-test',
  templateUrl: './itk-test.component.html',
  styleUrls: ['./itk-test.component.css']
})

export class ItkTestComponent implements OnInit {
  fullscreenRenderWindow = null;
  fileToUpload = null;

  constructor() { }

  handleFileInput(files: FileList) {
    this.fileToUpload = files;
    this.load();
  }

  load() {
    this.fullscreenRenderWindow = vtkFullScreenRenderWindow.newInstance();
    readImageDICOMFileSeries(null, this.fileToUpload).then(function({ image, webWorker }) {
        webWorker.terminate();
        const actor = vtkActor.newInstance();
        const mapper = vtkMapper.newInstance();
        const cone = convertItkToVtkImage(image)
        actor.setMapper(mapper);
        mapper.setInputConnection(cone.getOutputPort());
    
        const renderer = this.fullscreenRenderWindow.getRenderer();
        renderer.addActor(actor);
        renderer.resetCamera();
    
        const renderWindow = this.fullscreenRenderWindow.getRenderWindow();
        renderWindow.render();
    });
  }
  
  ngOnInit(): void {
  }
}