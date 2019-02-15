import { Component, OnInit, ViewChild } from '@angular/core';
import { FormularioRegistroAlumnoComponent } from '../formulario-registro-alumno/formulario-registro-alumno.component';

import { AlumnoService } from './../../services/alumno.service';
import { Alumno } from './../../models/alumno';
import { NgForm } from '@angular/forms';


import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { ResumenComponent } from '../resumen/resumen.component';
import { ModalViewComponent} from '../modal-view/modal-view.component';
import { MatDialogConfig } from "@angular/material";
import { LoginService } from './../../services/login.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  fila: any;

  displayedColumns: string[] = ['controlNumber', 'lastNameFather', 'lastNameMother', 'firstName', 'career', 'actions'];

  dataSource: MatTableDataSource<Alumno>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  alumno: Alumno;
  alumnos: any;

  constructor(private alumnoService: AlumnoService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private notificationService: NotificationService) {
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
  /*
  openDialog(): void {
    const dialogRef = this.dialog.open(DetalleAlumnoDialogComponent, {
      width: '850px',


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }*/

  onEdit(row): void {
    let valor = 'hola';
    // this.alumnoService.(valor);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DetalleAlumnoDialogComponent, dialogConfig);
  }


  onDelete(controlNumber) {

    //this.alumnoService.deleteAlumno('13400501').subscribe();
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este alumno?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.alumnoService.deleteAlumno(controlNumber).subscribe();
          this.notificationService.warn('! Deleted successfully');
        }
      });
  }

  onView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    this.dialog.open(ModalViewComponent, dialogConfig);
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
  fieldControlNumber: String = '';
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


  idAlumno: String;
  editarAlumno: any;
  editAverage: Number;
  editCareer: String;
  editCity: String;
  editColony: String;
  editCurp: String;
  editDateBirth: Date;
  editDisability: String;
  editEmail: String;
  editEtnia: String;
  editFirstName: String;
  editLastNameFather: String;
  editLastNameMother: String;
  editNameSchool: String;
  editNSS: Number;
  editOtherEtnia: String;
  editOtherSchool: String;
  editPhone: Number;
  editPlaceBirth: String;
  editPostalCode: String;
  editShool: String;
  editSexo: String;
  editState: String;
  editStatusCivil: String;
  editStreet: String;
  editWhichDisability: String;



  modalAlumno: Alumno;

  constructor(
    public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private loginService: LoginService,
    private alumnoService: AlumnoService) {

    this.loginService.currentIdAlumnoSource.subscribe(res => {
      this.idAlumno = res;
    });

    this.alumnoService.getAlumno('13400501').subscribe(res => {
      this.editarAlumno = res;
      this.editAverage = this.editarAlumno.average;
      this.editCareer = this.editarAlumno.career;
      this.editCity = this.editarAlumno.city;
      this.editColony = this.editarAlumno.colony;
      this.editCurp = this.editarAlumno.curp;
      this.editDateBirth = this.editarAlumno.dateBirth;
      this.editDisability = this.editarAlumno.disability;
      this.editEmail = this.editarAlumno.email;
      this.editEtnia = this.editarAlumno.etnia;
      this.editFirstName = this.editarAlumno.firstName;
      this.editLastNameFather = this.editarAlumno.lastNameFather;
      this.editLastNameMother = this.editarAlumno.lastNameMother;
      this.editNameSchool = this.editarAlumno.nameSchool;
      this.editNSS = this.editarAlumno.nss;
      this.editOtherEtnia = this.editarAlumno.otherEtnia;
      this.editOtherSchool = this.editarAlumno.otherSchool;
      this.editPhone = this.editarAlumno.phone;
      this.editPlaceBirth = this.editarAlumno.placeBirth;
      this.editPostalCode = this.editarAlumno.postalCode;
      this.editShool = this.editarAlumno.school;
      this.editSexo = this.editarAlumno.sex;
      this.editState = this.editarAlumno.state;
      this.editStatusCivil = this.editarAlumno.statusCivil;
      this.editStreet = this.editarAlumno.street;
      this.editWhichDisability = this.editarAlumno.whichDisability;
    });



    console.log();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  exit(): void {
    this.dialogRef.close();
  }


  /*
  updateModal(): void {

    this.modalAlumno = {
      lastNameFather: '',
      lastNameMother: '',
      firstName: '',
      controlNumber: '',
      placeBirth: '',
      dateBirth:  this.editDateBirth,
      statusCivil: '',
      email: this.editEmail,
      curp: this.editCurp,
      nss: 0,
      sex: '',
      street: '',
      colony: this.editColony,
      city: this.editCity ,
      state: '',
      postalCode: 63061,
      phone: 3111591173,
      etnia: '',
      otherEtnia: '',
      disability: '',
      whichDisability: this.editDisability,
      school: '',
      otherSchool: '',
      nameSchool: '',
      average: this.editAverage,
      career: this.editCareer,
      documents: [],

    };
    this.alumnoService.putAlumno(this.modalAlumno, this.idAlumno).subscribe();
  }*/

}


