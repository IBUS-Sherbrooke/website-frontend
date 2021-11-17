import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sample-get-request',
  templateUrl: './sample-get-request.component.html',
  styleUrls: ['./sample-get-request.component.css']
})
export class SampleGetRequestComponent implements OnInit {
  snackBarNoServer: string = "Server is not currently running";
  confirmMessage: string = "Close"
  constructor(private http: HttpClient, private statusSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.http.get('http://localhost:2000/api/printRequests/mock', {responseType: 'text'}).subscribe({
      next: data => {
          console.log(data);
      },
      error: error => {
          this.statusSnackBar.open(this.snackBarNoServer, this.confirmMessage);
          console.log('Could not reach server: ', error);
      }
  });

  }

}
