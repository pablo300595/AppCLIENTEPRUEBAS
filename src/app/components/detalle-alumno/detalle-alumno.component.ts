import { Component, OnInit, ViewChild } from '@angular/core';
import { FormularioRegistroAlumnoComponent } from '../formulario-registro-alumno/formulario-registro-alumno.component';

import { AlumnoService } from './../../services/alumno.service';
import { Alumno } from './../../models/alumno';
import { NgForm } from '@angular/forms';


import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})

export class DetalleAlumnoComponent implements OnInit {
  displayedColumns: string[] = ['lastNameFather', 'lastNameMother', 'firstName', 'email', 'career'];

  dataSource: MatTableDataSource<Alumno>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  alumno: Alumno;
  alumnos: any;

  constructor(private alumnoService: AlumnoService) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => this.getAlumnos());

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.alumnos);

  }

  ngOnInit() {


    this.alumnoService.getAlumnos()
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);

        this.dataSource = new MatTableDataSource(this.alumnos);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


