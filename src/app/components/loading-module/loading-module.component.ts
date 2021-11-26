import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-loading-module',
  templateUrl: './loading-module.component.html',
  styleUrls: ['./loading-module.component.css']
})
export class LoadingModuleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {dialogTitle: string},
    public dialogRef: MatDialogRef<LoadingModuleComponent>) {}

    ngOnInit(): void {
      this.dialogRef.disableClose = true;
    }

}
