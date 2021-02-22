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
  return_message = 'Le serveur n a pas encore retourner de message';
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
      let json_data=JSON.parse(data)
      this.return_message = "Le fichier " + json_data.name +
                            " a ete upload au serveur sans probleme, sous le projet: " +
                            json_data.project_name+ " avec le user id: " +json_data.user_id
      
      console.log(this.return_message )
      console.log("Post_Success!")
      }, error => {
        console.log(error);
      });
  }
  
  ngOnInit(): void {
  }

}

