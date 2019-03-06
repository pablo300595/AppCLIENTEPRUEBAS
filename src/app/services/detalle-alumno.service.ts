import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleAlumnoService {
  private rowCtrlNumberSource = new BehaviorSubject('');
  currentRowCtrlNumber = this.rowCtrlNumberSource.asObservable();

  constructor() { }

  changeAlumnoToUpdate(ctrlNumber) {
    this.rowCtrlNumberSource.next(ctrlNumber);
  }
}
