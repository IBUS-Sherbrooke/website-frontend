import { Component, OnInit } from '@angular/core';
import runPipelineBrowser from 'itk/runPipelineBrowser';

import IOTypes from 'itk/IOTypes';
import macro from 'vtk.js/Sources/macro';
import ITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';



const { vtkErrorMacro } = macro;
declare var require: any
@Component({
  selector: 'app-call-cxx-script',
  templateUrl: './call-cxx-script.component.html',
  styleUrls: ['./call-cxx-script.component.css']
})
export class CallCxxScriptComponent implements OnInit {
  webWorker
  
  constructor() {     
  //Load the script to call locally so that runPipelineBrowser can find it.
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "./itk/Pipelines/helloWasm.js"
  document.head.appendChild(script)}

  ngOnInit(): void {
    this.webWorker=null
  }
  call_script(){

    runPipelineBrowser(
      this.webWorker, //We pass null here, to create a new web worker
      'hello'//Script to call
      ).then((result) => {
      
      console.log(result)
      this.webWorker = result.webWorker;
      })
    

  }
}

