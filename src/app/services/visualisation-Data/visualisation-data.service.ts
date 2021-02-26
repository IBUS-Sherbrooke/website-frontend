import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import ITKHelper from "vtk.js/Sources/Common/DataModel/ITKHelper";

@Injectable({
  providedIn: 'root'
})
export class VisualisationDataService {

  fileToUpload = null;
  visualisationData = new Subject<any>();
  data2= new Subject<any>();
  constructor() { }

  load(files) {
    readImageDICOMFileSeries(files).then(image => {
      let data = ITKHelper.convertItkToVtkImage(image.image)
      console.log(data);
      this.visualisationData.next(data);
      this.data2.next(data);
    })
  }

  getData(): Observable<any> {
    return this.visualisationData.asObservable();
  }

  getRawData(): Observable<any> {
    return this.data2.asObservable();
  }
}
