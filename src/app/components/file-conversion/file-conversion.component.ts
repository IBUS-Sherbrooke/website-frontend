import { Component, OnInit } from '@angular/core';
import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";
import { vtk_image_to_STL } from "./vtk_image_to_STL";
import { Subscription } from 'rxjs';
import { PostDataService } from '../../services/post-data/post-data.service';
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-file-conversion',
  templateUrl: './file-conversion.component.html',
  styleUrls: ['./file-conversion.component.css']
})

export class FileConversionComponent implements OnInit {
  img_data:any;
  subscription: Subscription;
  vtk_data_blob: Blob;
  constructor(private visualisationDataService: VisualisationDataService, private Post_data_service: PostDataService) { }

  ngOnInit(): void {
    //get data on upload (this should be changed to update data whenever it is changed through segmentation or other inputs)
    this.subscription = this.visualisationDataService.getData()
    .subscribe(imageData => {
      this.img_data=imageData
    }),
    error => {
      console.log(error);
    }
  }
  
  send_file(){
  //This function converts the currently loaded VTK image into the stl format and 
    this.vtk_data_blob=vtk_image_to_STL(this.img_data)
    this.post_file()
  }

  download_file(){
    //This function converts the currently loaded VTK image into the stl format and 
      this.vtk_data_blob=vtk_image_to_STL(this.img_data)
      saveAs(this.vtk_data_blob, "my_file.stl")
    }

  post_file() {
    this.Post_data_service.postFile(this.vtk_data_blob).subscribe(data => 
      {
        console.log(data)}
        , error => {
        console.log(error);
        });
    }
}
