import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Alumno } from './../models/alumno';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {
  readonly URL = 'https://app-apipruebas.herokuapp.com/secretarias';
  // readonly URL = 'http://localhost:3000/secretarias';
  constructor(private http: HttpClient) {

  }

  updateSecretariaCareer(career , id) {
    return this.http.put(this.URL + `/career/${id}`, career);
  }
}
