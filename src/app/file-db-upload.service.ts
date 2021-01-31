import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpErrorResponse, HttpHeaders} from  '@angular/common/http';
import { catchError, map } from  'rxjs/operators';
import { throwError } from 'rxjs'; 
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class FileDbUploadService {

  constructor(private httpClient: HttpClient) { }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
  postFile(fileToUpload: File): Observable<any> {
    let httphead:HttpHeaders = new HttpHeaders()
    httphead.append('Access-Control-Allow-Origin',  '*');
    httphead.append('responseType', 'text');
    const endpoint = 'https://webhook.site/fb9ed0fd-0ef7-489b-8b18-5d298e95664e';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, {headers: new HttpHeaders({
        'responseType': 'text',
        'Access-Control-Allow-Origin': '*',
      })},) 
      .pipe(map(() => { return true; }))
      .pipe(catchError(this.errorHandler));

}
}