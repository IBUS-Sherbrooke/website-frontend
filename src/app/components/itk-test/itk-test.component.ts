import { Component, OnInit } from '@angular/core';

import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkImageMapper from 'vtk.js/Sources/Rendering/Core/ImageMapper';
import ITKHelper from "vtk.js/Sources/Common/DataModel/ITKHelper";
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';


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
    readImageDICOMFileSeries(this.fileToUpload).then((image, webWorker) => {
        //webWorker.terminate();
        console.log(image);
        console.log(image.image);
        console.log(this);
        const actor = vtkVolume.newInstance();
        const mapper = vtkVolumeMapper.newInstance();
        const imageData = ITKHelper.convertItkToVtkImage(image.image)
        console.log(imageData);
        mapper.setInputData(imageData);
        actor.setMapper(mapper);

        const renderer = this.fullscreenRenderWindow.getRenderer();
        renderer.addVolume(actor);
        renderer.resetCamera();
    
        const renderWindow = this.fullscreenRenderWindow.getRenderWindow();
        console.log(renderWindow);
        renderWindow.render();
    });
  }
  
  ngOnInit(): void {
  }
}