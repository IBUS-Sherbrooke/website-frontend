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
  postFile(fileToUpload: Blob ): Observable<any> {
    //Adresse du serveur
    console.log(fileToUpload)
    console.log("sending")
    const endpoint = 'http://localhost:2000/api/printRequests';
    const formData: FormData = new FormData();
    //on met le contenu du fichier dans form data avec son nom
    formData.append('print_data', fileToUpload);
    formData.append('name', "abcd.stl");
    //va falloir update ses valeurs dependant de l'utilisateur
    formData.append('user_id', '1');
    formData.append('project_name', 'project1');
    console.log(formData)
    return this.httpClient
      .post(endpoint, formData, {responseType: 'text'}) 
      .pipe(catchError(this.errorHandler));

}
}