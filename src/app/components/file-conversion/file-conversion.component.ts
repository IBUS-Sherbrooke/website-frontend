import { Component, OnInit } from '@angular/core';
import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";
import { Subscription } from 'rxjs';
import vtkImageMarchingCubes from 'vtk.js/Sources/Filters/General/ImageMarchingCubes';
import vtkSTLWriter from 'vtk.js/Sources/IO/Geometry/STLWriter';
import vtkPolyData from 'vtk.js/Sources/Common/DataModel/PolyData';
import { FileDbUploadService } from '../../services/file-db-upload.service';
@Component({
  selector: 'app-file-conversion',
  templateUrl: './file-conversion.component.html',
  styleUrls: ['./file-conversion.component.css']
})

export class FileConversionComponent implements OnInit {
  file_update_msg="aaaa";
  img_data:any;
  subscription: Subscription;
   
  constructor(private visualisationDataService: VisualisationDataService, private service: FileDbUploadService) { }
  writer = vtkSTLWriter.newInstance();
  fileContents
  ngOnInit(): void {
    
    this.subscription = this.visualisationDataService.getRawData()
    .subscribe(imageData => {
      this.img_data=imageData
        console.log("Button-time!")
        console.log(imageData)
        console.log((imageData.getClassName))
    }),
    error => {
      console.log(error);
    }
  }
  
  file_conversion(){
    this.file_update_msg="conversion started"
    const mCubes = vtkImageMarchingCubes.newInstance({contourValue: 0.0,
      computeNormals: true,
      mergePoints: true, });
    const data = this.img_data;
    const dataRange = data.getPointData().getScalars().getRange();
    console.log(dataRange)
    const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;
    mCubes.setContourValue(firstIsoValue);
    //mCubes.setInputConnection(data)
    let outdata=[];
    console.log("requesting data")
    console.log(this.img_data)
    mCubes.requestData([data],outdata) 
    console.log("Done requesting data")
    this.writer.setInputData(outdata[0]);
    console.log("Done requesting data2")
    this.fileContents = this.writer.getOutputData();
    console.log(this.fileContents)
    this.uploadFileToActivity()
  
  }

  uploadFileToActivity() {
    const blob = new Blob([this.fileContents], { type: 'application/octet-steam' });
    //Fonction servant à envoyer une requête post vers le serveur
      this.service.postFile(blob).subscribe(data => {
        console.log(data)
        try {
          let json_data=JSON.parse(data)
          this.file_update_msg = "Le fichier " + json_data.name +
                                " a ete upload au serveur sans probleme, sous le projet: " +
                                json_data.project_name+ " avec le user id: " +json_data.user_id
          console.log(this.file_update_msg)
          console.log("Post_Success!")
        }
        catch(err) {
          this.file_update_msg=data
        
        }}
        , error => {
          console.log(error);
        });
    }
}
