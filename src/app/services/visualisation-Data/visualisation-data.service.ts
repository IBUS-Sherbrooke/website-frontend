import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import ITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';
import readImageFile from 'itk/readImageFile'
@Injectable({
  providedIn: 'root'
})
export class VisualisationDataService {
  dicom_file_serie= new Subject<any>();
  fileToUpload = null;
  
  visualisationData = new Subject<any>();
  data2 = new Subject<any>();
  constructor() { }
  savefile(files): void {
    console.log("Saving original file")
    this.dicom_file_serie.next(files)
  }
  load(im_file,singlefile) {
    if (singlefile)
    readImageFile(null,im_file).then(image => {
      const data = ITKHelper.convertItkToVtkImage(image.image);
      this.visualisationData.next(data);
      this.data2.next(data);
    });
    else
    readImageDICOMFileSeries(im_file).then(image => {
       const data = ITKHelper.convertItkToVtkImage(image.image);
       this.visualisationData.next(data);
       this.data2.next(data);
     });
  }
  getFile(): Observable<any> {
    return this.dicom_file_serie.asObservable();
  }
  getData(): Observable<any> {
    return this.visualisationData.asObservable();
  }

  getRawData(): Observable<any> {
    return this.data2.asObservable();
  }
}
