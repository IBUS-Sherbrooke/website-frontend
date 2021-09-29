import { Component, OnInit } from '@angular/core';
import runPipelineBrowser from 'itk/runPipelineBrowser';


import IOTypes from 'itk/IOTypes';
import macro from 'vtk.js/Sources/macro';
import ITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';
import { VisualisationDataService } from "../../services/visualisation-Data/visualisation-data.service";
import { Subscription } from 'rxjs';
import axios from 'axios'
import readImageFile from 'itk/readImageFile'
import ImageType from 'itk/ImageType'
import IntTypes from 'itk/IntTypes'
import Image from 'itk/Image'

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
  //const script = document.createElement("script")
  //script.type = "text/javascript"
  //script.src = "./itk/Pipelines/itk_filtering.js"
  //document.head.appendChild(script)
}

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
    // prevent source data neutering
    this.img_data.data=this.img_data.data.slice(0)

    const fileName = 'cthead1.png'
    const testFilePath = 'assets/project_logo.png'  
    const dimension = 2
    const componentType = IntTypes.UInt8
    const imageType = new ImageType(dimension, componentType)
    const image2 = new Image(imageType)
    image2.size = [256, 256]
    image2.data = new Uint8Array(this.img_data.data)
    console.log(this.img_data)
    console.log(this.img_data.data)
    console.log(image2)
    debugger;
      const pipelinePath = 'itk_filtering'
      const args = ['cthead1.json']//, 'cthead12.png', '100', '100', '400', '800']
      const desiredOutputs = [
        { path: args[0], type: IOTypes.Image }
      ]
 /*     const inputs = [
        { path: args[0], type: IOTypes.Image, data: image2 }
      ]*/
    debugger;
    runPipelineBrowser(null, pipelinePath, args, desiredOutputs).then(function ({ stdout, stderr, outputs, webWorker }) {
      console.log("exited run pipe")
      console.log(stderr)
      console.log(stdout)
      console.log(outputs)
      webWorker.terminate()
    })//, inputs)
    debugger;
    console.log("done")
    //let a= ['Segmentation', 'input.json', 'output.json', String(0),String(255),String(5),String(5),String(5)],//args
/*     runPipelineBrowser(
      null, //We pass null here, to create a new web worker
      'HelloWorld',//Script to call
      ['image', './anything.dcm',"100","100","400","800"],//args
      [{ path: 'output.json', type: IOTypes.Image }], // output
      [{ path: 'input.json', type: IOTypes.Image, data: this.img_data }] // input
      ).then(function ({ stdout, stderr, outputs, webWorker }) {
        webWorker.terminate()
      }) */
  }
}

