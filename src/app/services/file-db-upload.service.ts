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
    //Adresse du serveur
    const endpoint = 'http://localhost:2000/api/printRequests';
    const formData: FormData = new FormData();
    //on met le contenu du fichier dans form data avec son nom
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, {
        headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data' // definition des parametre du header http ici
      })},) 
      .pipe(map(() => { return true; }))
      .pipe(catchError(this.errorHandler));

}
}