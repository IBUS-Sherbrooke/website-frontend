import { Component, OnInit } from '@angular/core';
import runPipelineBrowser from 'itk/runPipelineBrowser';

import IOTypes from 'itk/IOTypes';
import macro from 'vtk.js/Sources/macro';
import ITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';


runPipelineBrowser(
  this.webWorker, //on passe null ici, pour qu'il créer un nouveau web worker
  'itkfiltering').then((result) => {
  console.log("aaaaaaaa")
  this.webWorker = result.webWorker;

  })
  console.log("ccccccccccc")
  