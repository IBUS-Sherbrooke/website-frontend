import { Component, OnInit } from '@angular/core';

import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";
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

  constructor(private visualisationDataService: VisualisationDataService) { }
  
  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files;
    this.visualisationDataService.load(this.fileToUpload);
  }
}