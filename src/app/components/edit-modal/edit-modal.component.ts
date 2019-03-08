import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})



export class EditModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditModalComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Aceptado'},
    {value: 'pizza-1', viewValue: 'En proceso'},
    {value: 'tacos-2', viewValue: 'Rechazado'}
  ];

  exit(): void {
    this.dialogRef.close();
  }
}
