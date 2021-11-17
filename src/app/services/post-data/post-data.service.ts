import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private httpClient: HttpClient) { }
  errorHandler(error: HttpErrorResponse): Observable<any> {
    return throwError(error.message || 'server Error');
  }
  postFile(fileToUpload: Blob, name= 'Impression_name', userId= '1', projectName= 'project1' ): Observable<any> {
    // Post function for files
    const endpoint = 'http://localhost:2000/api/printRequests';
    const formData: FormData = new FormData();
    console.log('posting');
    formData.append('name', name);
    formData.append('user_id', userId);
    formData.append('project_name', projectName);
    formData.append('print_data', fileToUpload);
    return this.postdata(endpoint, formData);
}

postdata(endpoint, data): Observable<any> {
  // General post function, for any data and enpoint
  return this.httpClient
    .post(endpoint, data, {responseType: 'text'});
}

getdata(endpoint, data): Observable<any> {
  // General post function, for any data and enpoint
  return this.httpClient
  .post(endpoint, data, {responseType: 'blob'});
}
}
