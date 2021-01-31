import { Component, OnInit } from '@angular/core';
import { FileDbUploadService } from '../file-db-upload.service';
import {HttpClient} from  '@angular/common/http';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  fileToUpload=null;
  constructor(private service: FileDbUploadService) { 
    console.log("Init_Success!")
  }
  handleFileInput(files: FileList) {
    console.log("Assigning item!")
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity()
  }
uploadFileToActivity() {
    this.service.postFile(this.fileToUpload).subscribe(data => {
      console.log("Post_Success!")
      }, error => {
        console.log(error);
      });
  }
  
  ngOnInit(): void {
  }

}

