import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Alumno } from './../models/alumno';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  selectedAlumno: Alumno;
  alumnos: Alumno[];
  sesionType: String = 'guest';
  statusInscripcion: String = 'No status';

  readonly URL = 'https://app-apipruebas.herokuapp.com/alumnos';
  // readonly URL = 'http://localhost:3000/alumnos';

  constructor(private http: HttpClient) {
    this.selectedAlumno = new Alumno();
  }

  postAlumno(alumno: Alumno) {
    console.log(alumno);
    return this.http.post(this.URL, alumno);
  }

  getAlumnos() {
    return this.http.get(this.URL);
  }

  getAlumnosByCareer(career) {
    return this.http.post(this.URL + '/career', career);
  }

  getAlumno(id) {
    return this.http.get(this.URL + '/' + id);
  }

  getAlumnoR(id) {
    return this.http.get(this.URL + '/' + id);
  }

  getAlumnoById(id) {
    return this.http.get(this.URL + '/id/' + id);
  }

  getAlumnoStatusInscripcion(idAlumno) {
    return this.http.get(this.URL + `/status/${idAlumno}`);
  }

  putAlumno(alumno: Alumno , id) {
    return this.http.put(this.URL + `/${id}`, alumno);
  }

  putStatusAlumno(alumno: Alumno , id) {
    return this.http.put(this.URL + `/status/${id}`, alumno);
  }

  putStatusAlumnoByCtrl(alumno: any , id) {
    return this.http.put(this.URL + `/status/ctrl/${id}`, alumno);
  }

  putAlumnoByCtrl(alumno: Alumno , id) {
    return this.http.put(this.URL + `/ctrl/${id}`, alumno);
  }

  deleteAlumno(_id: string) {
    // return this.http.delete(this.URL + `/${_id}`);
    return this.http.delete(this.URL + '/' + _id);
  }

  updateAlumnoDocumentation(_id: string, documentation: Object) {
    return this.http.put(this.URL + `/documentation/${_id}`, documentation);
  }

  updateAlumnoDocumentationByCtrlNumber(ctrlNumber, documentation: Object) {
    return this.http.put(this.URL + `/documentation/ctrl/${ctrlNumber}`, documentation);
  }

  getAlumnoDocumentation(_id) {
    return this.http.get(this.URL + `/documentation/${_id}`);
  }


}

