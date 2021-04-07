import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-print-status-page',
  templateUrl: './print-status-page.component.html',
  styleUrls: ['./print-status-page.component.css']
})
export class PrintStatusPageComponent implements OnInit {
  print_status: string;
  errorMessage: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  request_print_status(text){
    console.log(text)
  }
  
  get_print_status(text2){
  this.http.get('http://localhost:2000/api/printRequests/mock', {responseType: 'text'}).subscribe({
    next: data => {
        this.print_status = data;
        console.log(this.print_status)
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
  })
  }
}
