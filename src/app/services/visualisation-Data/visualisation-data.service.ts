import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import ITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper';

import { MatDialog } from '@angular/material/dialog';
import { LoadingModuleComponent } from 'src/app/components/loading-module/loading-module.component';

@Injectable({
  providedIn: 'root'
})
export class VisualisationDataService {

  dialogRef = null;
  fileToUpload = null;
  visualisationData = new Subject<any>();
  data2 = new Subject<any>();
  constructor(public dialog: MatDialog) { }

  load(files: any): void {
    this.openLoadingDialog();
    readImageDICOMFileSeries(files)
    .then((image: any) => {
      const data = ITKHelper.convertItkToVtkImage(image.image);
      console.log(data);
      this.visualisationData.next(data);
      this.data2.next(data);
    })
    .then(() => {
      if (this.dialogRef !== null) {
        this.dialogRef.close();
      }
    });
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
