import { Component, OnInit } from '@angular/core';
import { FileDbUploadService } from '../../services/file-db-upload.service';
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
    //Choisir le fichier
    this.fileToUpload = files.item(0);
    //Envoie vers serveur
    this.uploadFileToActivity()
  }
uploadFileToActivity() {
  //Fonction servant à envoyer une requête post vers le serveur
    this.service.postFile(this.fileToUpload).subscribe(data => {
      console.log("Post_Success!")
      }, error => {
        console.log(error);
      });
  }
  
  ngOnInit(): void {
  }

}

