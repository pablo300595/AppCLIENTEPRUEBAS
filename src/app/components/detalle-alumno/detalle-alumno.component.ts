import { Component, OnInit } from '@angular/core';
import {FormularioRegistroAlumnoComponent} from '../formulario-registro-alumno/formulario-registro-alumno.component';

import { AlumnoService} from './../../services/alumno.service';
import { Alumno } from './../../models/alumno';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})
export class DetalleAlumnoComponent implements OnInit {

  alumno: Alumno;
  alumnos: any;

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit() {
  }

  getAlumnos() {
    this.alumnoService.getAlumnos()
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);
      });
  }
  

}
