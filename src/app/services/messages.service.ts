import { Injectable } from '@angular/core';
import {  MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(public snackBar: MatSnackBar) { }

  /*
    STEPS MESSAGES
  */

  warning(message) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['warning-msg'];
    config.duration = 5000;
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'left';
    this.snackBar.open(message, null, config);
  }

  success(message) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['success-msg'];
    config.duration = 5000;
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'left';
    this.snackBar.open(message, null, config);
  }
}
