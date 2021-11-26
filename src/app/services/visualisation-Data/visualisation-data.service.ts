import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import ITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';
import readImageFile from 'itk/readImageFile';
import { MatDialog } from '@angular/material/dialog';
import { LoadingModuleComponent } from 'src/app/components/loading-module/loading-module.component';
@Injectable({
  providedIn: 'root'
})
export class VisualisationDataService {
  dicomFileSerie = new Subject<any>();
  dialogRef = null;
  constructor(public dialog: MatDialog) { }
  fileToUpload = null;
  visualisationData = new Subject<any>();
  data2 = new Subject<any>();

  savefile(files): void {
    console.log('Saving original file');
    console.log(files)
    this.dicomFileSerie.next(files);
  }
  load(imFile, singleFile): void {
    if (singleFile) {
    readImageFile(null, imFile).then(image => {
      const data = ITKHelper.convertItkToVtkImage(image.image);
      this.visualisationData.next(data);
      this.data2.next(data);
    })
    .then(() => {
      if (this.dialogRef !== null) {
        this.dialogRef.close();
      }
    });
    }
    else {
    readImageDICOMFileSeries(imFile).then(image => {
       const data = ITKHelper.convertItkToVtkImage(image.image);
       this.visualisationData.next(data);
       this.data2.next(data);
     });
    }
  }
  getFile(): Observable<any> {
    return this.dicomFileSerie.asObservable();
  }
  getData(): Observable<any> {
    return this.visualisationData.asObservable();
  }

  getRawData(): Observable<any> {
    return this.data2.asObservable();
  }

  openLoadingDialog(): void {
    const dialogRef = this.dialog.open(LoadingModuleComponent, {
      width: '300px'
    });

    this.dialogRef = dialogRef;
  }
}
