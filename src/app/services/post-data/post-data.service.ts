import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpErrorResponse, HttpHeaders} from  '@angular/common/http';
import { catchError, map } from  'rxjs/operators';
import { throwError } from 'rxjs'; 
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private httpClient: HttpClient) { }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
  postFile(fileToUpload: Blob,name='Impression_name',user_id='1',project_name='project1' ): Observable<any> {
    //Post function for files
    const endpoint = 'http://localhost:2000/api/printRequests';
    const formData: FormData = new FormData();
    console.log("posting")
    formData.append('print_data', fileToUpload);
    formData.append('name', name);
    formData.append('user_id', user_id);
    formData.append('project_name', project_name);
    return this.postdata(endpoint,formData)
}

getSegmentation(fileToUpload: Blob,name='Impression_name',user_id='1',project_name='project1' ): Observable<any> {
  //Post function for files
  const endpoint = 'http://localhost:2000/api/segmentation';
  const formData: FormData = new FormData();
  
  formData.append('print_data', fileToUpload);
  formData.append('name', name);
  formData.append('user_id', user_id);
  formData.append('project_name', project_name);
  console.log("formData")
  return this.getdata(endpoint,formData)
}

postdata(endpoint,data): Observable<any> {
  //General post function, for any data and enpoint
  return this.httpClient
    .post(endpoint, data, {responseType: 'text'}) 
}

getdata(endpoint,data): Observable<any> {
  //General post function, for any data and enpoint
  return this.httpClient
    .get(endpoint, data) 
}
}