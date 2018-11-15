import { Component, OnInit } from '@angular/core';
import { AlumnoService} from './../../services/alumno.service';
import { Alumno } from './../../models/alumno';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-formulario-registro-alumno',
  templateUrl: './formulario-registro-alumno.component.html',
  styleUrls: ['./formulario-registro-alumno.component.css']
})
export class FormularioRegistroAlumnoComponent implements OnInit {
  fieldName: String = '';
  alumno: Alumno;
  alumnos: any;

  constructor(private alumnoService: AlumnoService) {

  }

  ngOnInit() {
  }

  insertAlumno() {
    this.alumno = {
      name: this.fieldName
    };
    this.alumnoService.postAlumno(this.alumno)
      .subscribe();
    console.log('Alumno agregado con exito!!!');
  }

  getAlumnos() {
    this.alumnoService.getAlumnos()
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);
      });
  }

  updateAlumno() {
    this.alumno = {
      name: this.fieldName
    };
    this.alumnoService.putAlumno(this.alumno)
        .subscribe();
        console.log('Alumno actualizado con exito!!!');
  }

}
