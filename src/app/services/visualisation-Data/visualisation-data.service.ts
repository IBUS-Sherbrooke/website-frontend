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
  raw_data= new Subject<any>();
  constructor() { }

  load(files) {
    readImageDICOMFileSeries(files).then(image => {
      let data = ITKHelper.convertItkToVtkImage(image.image)
      let data_autre = ITKHelper.convertVtkToItkImage(data);
      this.visualisationData.next(data);
      this.raw_data.next(data_autre);
    })
  }

  getData(): Observable<any> {
    return this.visualisationData.asObservable();
  }

  getRawData(): Observable<any> {
    return this.raw_data.asObservable();
  }
}
