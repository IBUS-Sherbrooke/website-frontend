import { Component, OnInit } from '@angular/core';
import { VisualisationDataService } from '../../services/visualisation-Data/visualisation-data.service';
import { vtk_image } from './vtk_image_to_STL';
import { Subscription } from 'rxjs';
import { PostSegmentationService } from '../../services/post-segmentation/post-segmentation.service';
import {saveAs} from 'file-saver';
import { VtkManagerService } from '../../services/vtk-manager/vtk-manager.service';
import { LoadingModuleComponent } from 'src/app/components/loading-module/loading-module.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-file-segmentation',
  templateUrl: './file-segmentation.component.html',
  styleUrls: ['./file-segmentation.component.css']
})

export class FileSegmentationComponent implements OnInit {
  imgData: any;
  subscription: Subscription;
  vtkDataBlob: Blob;
  dialogRef = null;
  constructor(private visualisationDataService: VisualisationDataService, private postSegmentationService: PostSegmentationService, private vtkManagerService: VtkManagerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // get data on upload (this should be changed to update data whenever it is changed through segmentation or other inputs)
 //   this.subscription = this.visualisationDataService.getFile().subscribe(imageData => {
      
  //    console.log("subscribed:",imageData)
   //   this.imgData = imageData;
      
      //this.imgData=JSON.parse(JSON.stringify(imageData))

   // }),
   // error => {
   //   console.log(error);
   // };
  }

  send_file(): void{
    this.imgData =this.vtkManagerService.getFile()
    this.post_file(this.imgData);
  }
  post_file(base64data): void{
  console.log("aaa",this.imgData)
  var x= this.vtkManagerService.get_x_coord()
  var y= this.vtkManagerService.get_y_coord()
  var z= this.vtkManagerService.get_z_coord()
  this.openLoadingDialog();
  this.postSegmentationService.getSegmentation(base64data,x,y,z)
    .subscribe(data =>
      {
        if (this.dialogRef !== null) {
          this.dialogRef.close();
        }
        saveAs(data, 'my_segmentation.nrrd');
        console.log(data); }
        , error => {
        console.log(error);
        });
  }

  convert_to_blob(): void{
    const blob = this.vtkDataBlob;
    const reader = new FileReader();
    const that = this;
    reader.readAsDataURL(blob);
    reader.onloadend =  function(e) {
    const base64data = reader.result;
    that.post_file(base64data);
  };
}

  openLoadingDialog(): void {
    const dialogRef = this.dialog.open(LoadingModuleComponent, {
      data: {
        dialogTitle: "Segmenting..."
      },
      width: '300px'
    });

    this.dialogRef = dialogRef;
  }
}

