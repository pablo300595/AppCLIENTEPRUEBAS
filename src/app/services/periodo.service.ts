import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Periodo } from './../models/periodo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  selectedPeriodo: Periodo;
  periodos: Periodo[];


  readonly URL = 'https://app-apipruebas.herokuapp.com/periodo';
  // readonly URL = 'http://localhost:3000/periodo';


  constructor(private http: HttpClient) {
    this.selectedPeriodo = new Periodo();
  }

  
  postPeriodo(periodo: Periodo []) {
    console.log(periodo);
    return this.http.post(this.URL, periodo);
  }

  getPeriodos() {
    return this.http.get(this.URL);
  }

  getPeriodoById(id) {
    return this.http.get(this.URL + '/id/' + id);
  }

  getPeriodosByPeriodo(periodo) {
    return this.http.post(this.URL + '/periodo', periodo);
  }

  putPeriodo(periodo: Periodo , id) {
    return this.http.put(this.URL + `/${id}`, periodo);
  }



}
