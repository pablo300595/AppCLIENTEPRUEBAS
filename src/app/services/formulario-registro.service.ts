import { Injectable } from '@angular/core';
import { Alumno } from './../models/alumno';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioRegistroService {
  alumnoToUpdate = new Alumno();

  private alumnoToUpdateSource = new BehaviorSubject(this.alumnoToUpdate);
  currentalumnoToUpdate = this.alumnoToUpdateSource.asObservable();

  private firstTryGivenValuesSource = new BehaviorSubject(false);
  currentfirstTryGivenValues = this.firstTryGivenValuesSource.asObservable();

  private allFieldsAreValidSource = new BehaviorSubject(false);
  currentallFieldsAreValid = this.allFieldsAreValidSource.asObservable();

  constructor() {

  }

  changeAlumnoToUpdate(alumno: Alumno) {
    this.alumnoToUpdateSource.next(alumno);
  }

  changefirstTryGivenValues(status: boolean) {
    this.firstTryGivenValuesSource.next(status);
  }

  changeallFieldsAreValid(status: boolean) {
    this.allFieldsAreValidSource.next(status);
  }

}
