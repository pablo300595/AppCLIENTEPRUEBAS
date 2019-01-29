import { Component, OnInit, ViewChild } from '@angular/core';
import { FormularioRegistroAlumnoComponent } from '../formulario-registro-alumno/formulario-registro-alumno.component';

import { AlumnoService } from './../../services/alumno.service';
import { Alumno } from './../../models/alumno';
import { NgForm } from '@angular/forms';


import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';



export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})

export class DetalleAlumnoComponent implements OnInit {

  animal: string;
  name: string;

  displayedColumns: string[] = ['lastNameFather', 'lastNameMother', 'firstName', 'email', 'career'];

  dataSource: MatTableDataSource<Alumno>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  alumno: Alumno;
  alumnos: any;

  constructor(private alumnoService: AlumnoService, public dialog: MatDialog) {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DetalleAlumnoDialogComponent, {
      width: '850px',
      

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'app-detalle-alumno-dialog.component',
  templateUrl: './detalle-alumno-dialog.component.html',
  styleUrls: ['./detalle-alumno-dialog.component.css']

})

export class DetalleAlumnoDialogComponent {

  fieldLastNameFather: String = '';
  fieldLastNameMother: String = '';
  fieldFirstName: String = '';
  fieldPlaceBirth: String = '';
  fieldDateBirth: String = '';
  fieldStatusCivil: String = '';
  fieldEmail: String = '';
  fieldCURP: String = '';
  fieldNSS: String = '';
  fieldStreet: String = '';
  fieldColony: String = '';
  fieldCity: String = '';
  fieldState: String = '';
  fieldPostalCode: String = '';
  fieldPhone: String = '';
  fieldEtnia: String = '';
  fieldOtherEtnia: String = '';
  fieldDisability: String = '';
  fieldWhichDisability: String = '';
  fieldSchool: String = '';
  fieldOtherSchool: String = '';
  fieldNameSchool: String = '';
  fieldAverage: Number = 0;
  fieldCareer: String = '';
  fieldDocuments: String[] = [];
  statusInscripcion: String = '';
  
    // Services variables
    alumno: Alumno;
    alumnos: any;
  
    idAlumnoLoged: String;
    statusInscripcionAlumno: string;
    // Error messages
  
    // Flags
    stepOneCompleted: boolean;
    firstTryGivenValues: boolean;

  constructor(
    public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


