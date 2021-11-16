import { Component, OnInit } from '@angular/core';
import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";
import { vtk_image } from "./vtk_image_to_STL";
import { Subscription } from 'rxjs';
import { PostSegmentationService } from '../../services/post-segmentation/post-segmentation.service';
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-file-segmentation',
  templateUrl: './file-segmentation.component.html',
  styleUrls: ['./file-segmentation.component.css']
})

export class FileSegmentationComponent implements OnInit {
  img_data:any;
  subscription: Subscription;
  vtk_data_blob: Blob;
  constructor(private visualisationDataService: VisualisationDataService, private Post_Segmentation_service: PostSegmentationService) { }

  ngOnInit(): void {
    //get data on upload (this should be changed to update data whenever it is changed through segmentation or other inputs)
    this.subscription = this.visualisationDataService.getFile().subscribe(imageData => {
      this.img_data=imageData
    }),
    error => {
      console.log(error);
    }
  }
  
  send_file(){
  //This function converts the currently loaded VTK image into the stl format and 
    //this.vtk_data_blob= new Blob([this.img_data], { type: 'application/octet-steam' });
    
    //this.vtk_data_blob=this.img_data
    console.log(this.img_data)
    //this.convert_to_blob()
    this.post_file(this.img_data)
  }
  post_file(base64data){
  console.log("a")
  this.Post_Segmentation_service.getSegmentation(base64data)
    .subscribe(data => 
      {
        saveAs(data, "my_segmentation.nrrd")
        console.log(data)}
        , error => {
        console.log(error);
        });
  }
  
  convert_to_blob() {
    var blob = this.vtk_data_blob
    var reader = new FileReader();
    var that=this
    reader.readAsDataURL(blob); 
    reader.onloadend =  function(e) {
    var base64data = reader.result;                
    that.post_file(base64data);
  }
}
    
}

