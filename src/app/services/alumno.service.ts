import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Alumno } from './../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  selectedAlumno: Alumno;
  alumnos: Alumno[];
  sesionType: String = 'guest';

  readonly URL = 'http://localhost:3000/alumnos';

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

   putAlumno(alumno: Alumno , id) {
      return this.http.put(this.URL + `/${id}`, alumno);
   }

   deleteAlumno(_id: string) {
      //return this.http.delete(this.URL + `/${_id}`);
   }
}
