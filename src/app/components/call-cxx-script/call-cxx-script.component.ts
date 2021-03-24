import { Component, OnInit } from '@angular/core';
import runPipelineBrowser from 'itk/runPipelineBrowser';

import IOTypes from 'itk/IOTypes';
import macro from 'vtk.js/Sources/macro';
import ITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';
import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";
import { Subscription } from 'rxjs';

const { vtkErrorMacro } = macro;
declare var require: any
@Component({
  selector: 'app-call-cxx-script',
  templateUrl: './call-cxx-script.component.html',
  styleUrls: ['./call-cxx-script.component.css']
})
export class CallCxxScriptComponent implements OnInit {
  webWorker
  img_data:any
  subscription: Subscription;
  constructor(private visualisationDataService: VisualisationDataService) {     
  //Load the script to call locally so that runPipelineBrowser can find it.
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "./itk/Pipelines/HelloWorld.js"
  document.head.appendChild(script)}

  ngOnInit(): void {
    this.webWorker=null

    this.subscription = this.visualisationDataService.getRawData()
    .subscribe(imageData => {
      this.img_data=imageData
    }),
    error => {
      console.log(error);
    }
  }
  call_script(){
    console.log(this.img_data)
    // prevent source data neutering
    this.img_data.data=this.img_data.data.slice(0)
    console.log(this.img_data)
    //let a= ['Segmentation', 'input.json', 'output.json', String(0),String(255),String(5),String(5),String(5)],//args
    runPipelineBrowser(
      this.webWorker, //We pass null here, to create a new web worker
      'HelloWorld',//Script to call
      ['Segmentation', 'input.json', 'output.json', String(0),String(255),String(5),String(5),String(5)],//args
      [{ path: 'output.json', type: IOTypes.Image }], // output
      [{ path: 'input.json', type: IOTypes.Image, data: this.img_data }] // input
      ).then((result) => {
      console.log(result)
      this.webWorker = result.webWorker;
      })
  }
}

