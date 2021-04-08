import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sample-get-request',
  templateUrl: './sample-get-request.component.html',
  styleUrls: ['./sample-get-request.component.css']
})

export class SampleGetRequestComponent implements OnInit {
  getString = 'Impossible de contacter le serveur';
  errorMessage: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:2000/api/printRequests/mock', {responseType: 'text'}).subscribe({
      next: data => {
          this.getString = data;
          console.log(this.getString);
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  });
  }

}
