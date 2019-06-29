import { Injectable } from '@angular/core';
import { MatConfirmDialogComponent } from '../components/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog} from '@angular/material';
import { ModalNotificationComponent } from '../components/modal-notification/modal-notification.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

    openConfirmDialog(msg) {
      return this.dialog.open(MatConfirmDialogComponent, {
        width: '390px',
        // panelClass: 'confirm-dialog-container',
        disableClose: true,
        data: {
          message: msg
        }
      });
   }

   openNotificationDialog(msg){
    return this.dialog.open(ModalNotificationComponent,{
      width: '390px',
      //panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg
      }
    });
   }

}
