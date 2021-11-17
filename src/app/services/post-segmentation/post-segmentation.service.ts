import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostSegmentationService {

  constructor(private httpClient: HttpClient) { }
  errorHandler(error: HttpErrorResponse): Observable<Error> {
    return throwError(error.message || 'server Error');
  }

getSegmentation(fileToUpload, name= 'Impression_name', userId= '1', projectName= 'project1'): Observable<Blob>{
  // Post function for files
  const endpoint = 'http://localhost:2000/api/segmentation';
  const formData: FormData = new FormData();
  // console.log(fileToUpload)
  formData.append('name', name);
  formData.append('print_data', fileToUpload);
  formData.append('user_id', userId);
  let filename = '';
  for (let i = 0; i < fileToUpload.length; i++) {
    filename = 'file_' + i;
    console.log(filename);
    formData.append(filename, fileToUpload[i]);
  }
  formData.append('project_name', projectName);
  console.log(formData);
  return this.getdata(endpoint, formData);
}

getdata(endpoint, data): Observable<Blob>{
  return this.httpClient.post(endpoint, data, {responseType: 'blob'});
}
}
