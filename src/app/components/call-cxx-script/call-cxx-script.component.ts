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
  //webWorker=new Worker("../../../../itk/web-build/itkfilteringWasm.js")
  webWorker
  
  constructor() {     
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "./itk/Pipelines/helloWasm.js"
  document.head.appendChild(script)}

  ngOnInit(): void {
    this.webWorker=null
  }
  call_script(){

    runPipelineBrowser(
      this.webWorker, //on passe null ici, pour qu'il créer un nouveau web worker
      'hello').then((result) => {
      console.log(result)
      this.webWorker = result.webWorker;
      })
    

  }
}

