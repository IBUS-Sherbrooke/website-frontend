import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-module',
  templateUrl: './loading-module.component.html',
  styleUrls: ['./loading-module.component.css']
})
export class LoadingModuleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoadingModuleComponent>) {}

    ngOnInit(): void {
      this.dialogRef.disableClose = true;
    }

}
