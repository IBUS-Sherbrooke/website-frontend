import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpErrorResponse, HttpHeaders} from  '@angular/common/http';
import { catchError, map } from  'rxjs/operators';
import { throwError } from 'rxjs'; 
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class PostSegmentationService {

  constructor(private httpClient: HttpClient) { }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

getSegmentation(fileToUpload,name='Impression_name',user_id='1',project_name='project1' ){
  
  //Post function for files
  const endpoint = 'http://localhost:2000/api/segmentation';
  const formData: FormData = new FormData();
  //console.log(fileToUpload)
  formData.append('name', name);
  formData.append('print_data', fileToUpload);
  formData.append('user_id', user_id);
  var filename=""
  for (var i = 0; i < fileToUpload.length; i++) { 
    filename="file_"+i
    console.log(filename)
    formData.append(filename, fileToUpload[i]);
  }
  formData.append('project_name', project_name);
  console.log(formData)
  return this.getdata(endpoint,formData)
}

getdata(endpoint,data){
  return this.httpClient.post(endpoint, data, {responseType: 'blob'})
}
}