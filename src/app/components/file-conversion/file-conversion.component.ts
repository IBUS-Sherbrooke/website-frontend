import { Component, OnInit } from '@angular/core';
import { VisualisationDataService } from '../../services/visualisation-Data/visualisation-data.service';
import { vtk_image_to_STL } from './vtk_image_to_STL';
import { Subscription } from 'rxjs';
import { PostDataService } from '../../services/post-data/post-data.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-file-conversion',
  templateUrl: './file-conversion.component.html',
  styleUrls: ['./file-conversion.component.css']
})

export class FileConversionComponent implements OnInit {
  imgData: any;
  subscription: Subscription;
  vtkDataBlob: Blob;
  constructor(private visualisationDataService: VisualisationDataService, private postDataService: PostDataService) { }

  ngOnInit(): void {
    // get data on upload (this should be changed to update data whenever it is changed through segmentation or other inputs)
    this.subscription = this.visualisationDataService.getRawData()
    .subscribe(imageData => {
      this.imgData = imageData;
    }),
    error => {
      console.log(error);
    };
  }
  send_file(): void{
  // This function converts the currently loaded VTK image into the stl format and
    this.vtkDataBlob = vtk_image_to_STL(this.imgData);
    console.log(this.vtkDataBlob);
    this.post_file();
  }

  download_file(): void{
    // This function converts the currently loaded VTK image into the stl format and
      this.vtkDataBlob = vtk_image_to_STL(this.imgData);
      saveAs(this.vtkDataBlob, 'my_file.stl');
    }

  post_file(): void{
    this.postDataService.postFile(this.vtkDataBlob).subscribe(data =>
      {
        console.log(data); }
        , error => {
        console.log(error);
        });
    }
}
