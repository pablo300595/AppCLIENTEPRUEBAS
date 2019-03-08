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
import { FormularioRegistroService } from './../../services/formulario-registro.service';
import { DetalleAlumnoService } from './../../services/detalle-alumno.service';

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

  selectedNoCtrl: string;

  constructor(private alumnoService: AlumnoService, public dialog: MatDialog, private detalleAlumnoService: DetalleAlumnoService,
    private dialogService: DialogService,
    private notificationService: NotificationService) {
    this.dataSource = new MatTableDataSource(this.alumnos);
  }

  ngOnInit() {
    this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res);

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

  preUpdate(ctrlNumber) {
    console.log('DETALLE NUMERO DE CONTROL: ' + ctrlNumber);
    this.detalleAlumnoService.changeAlumnoToUpdate(ctrlNumber);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DetalleAlumnoDialogComponent, dialogConfig).afterClosed(
    ).subscribe(
      res => this.doRefreshTable()
    );
  }

  doRefreshTable() {
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
  onDelete(controlNumber) {

    // this.alumnoService.deleteAlumno('13400501').subscribe();
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este alumno?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.alumnoService.deleteAlumno(controlNumber).subscribe(
            r => this.doRefreshTable()
          );
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

  loadDocumentApproval(controlNumber) {
    this.detalleAlumnoService.changeAlumnoToUpdate(controlNumber);
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
  fieldNSS: Number;
  fieldSex: String = '';
  fieldStreet: String = '';
  fieldColony: String = '';
  fieldCity: String = '';
  fieldState: String = '';
  fieldPostalCode: Number = 0;
  fieldPhone: Number = 0;
  fieldEtnia: String = '';
  fieldOtherEtnia: String = '';
  fieldDisability: String = '';
  fieldWhichDisability: String = '';
  fieldSchool: String = '';
  fieldOtherSchool: String = '';
  fieldNameSchool: String = '';
  fieldAverage: Number;
  fieldCareer: String = '';
  fieldDocuments: String[] = [];
  statusInscripcion: String;

  editLastNameFather: String;

  // Services variables
  alumno: Alumno;
  selectedNoCtrl: String;
  firstTryGivenValues: boolean;

  constructor(
    public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alumnoService: AlumnoService,
    private formularioRegistroService: FormularioRegistroService,
    private detalleAlumnoService: DetalleAlumnoService) {

    this.formularioRegistroService.changefirstTryGivenValues(false);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res);

    this.alumnoService.getAlumno(this.selectedNoCtrl).subscribe(res => {
      this.alumno = res as Alumno;
      this.fieldAverage = this.alumno.average;
      this.fieldCareer = this.alumno.career;
      this.fieldCity = this.alumno.city;
      this.fieldColony = this.alumno.colony;
      this.fieldCURP = this.alumno.curp;
      this.fieldDateBirth = this.alumno.dateBirth,
      this.fieldDisability = this.alumno.disability;
      this.fieldEmail = this.alumno.email;
      this.fieldEtnia = this.alumno.etnia;
      this.fieldFirstName = this.alumno.firstName;
      this.fieldLastNameFather = this.alumno.lastNameFather;
      this.fieldLastNameMother = this.alumno.lastNameMother;
      this.fieldNameSchool = this.alumno.nameSchool;
      this.fieldNSS = this.alumno.nss;
      this.fieldOtherEtnia = this.alumno.otherEtnia;
      this.fieldOtherSchool = this.alumno.otherSchool;
      this.fieldPhone = this.alumno.phone;
      this.fieldPlaceBirth = this.alumno.placeBirth;
      this.fieldPostalCode = this.alumno.postalCode;
      this.fieldSchool = this.alumno.school;
      this.fieldSex = this.alumno.sex,
      this.fieldState = this.alumno.state;
      this.fieldStatusCivil = this.alumno.statusCivil;
      this.fieldStreet = this.alumno.street;
      this.fieldWhichDisability = this.alumno.whichDisability;
      console.log(this.alumno);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  exit(): void {
    this.dialogRef.close();
  }

  updateAlumno(): void {

    this.alumno = {
      lastNameFather: this.fieldLastNameFather,
      lastNameMother: this.fieldLastNameMother,
      firstName: this.fieldFirstName,
      controlNumber: this.selectedNoCtrl,
      placeBirth: this.fieldPlaceBirth,
      dateBirth:  this.extractBirthFromCURP(this.fieldCURP.substring(4, 10)),
      statusCivil: this.fieldStatusCivil,
      email: this.fieldEmail,
      curp: this.fieldCURP,
      nss: this.fieldNSS,
      sex: this.fieldCURP.substring(10, 11),
      street: this.fieldStreet,
      colony: this.fieldColony,
      city: this.fieldCity ,
      state: this.fieldState,
      postalCode: this.fieldPostalCode,
      phone: this.fieldPhone,
      etnia: this.fieldEtnia,
      otherEtnia: this.fieldOtherEtnia,
      disability: this.fieldDisability,
      whichDisability: this.fieldWhichDisability,
      school: this.fieldSchool,
      otherSchool: this.fieldOtherSchool,
      nameSchool: this.fieldNameSchool,
      average: this.fieldAverage,
      career: this.fieldCareer,
      documents: [],

    };
    this.alumnoService.putAlumnoByCtrl(this.alumno, this.selectedNoCtrl).subscribe();
    this.dialogRef.close();
  }

  extractBirthFromCURP(curp: string) {
    let finalDate = '';
    let numericYear = + (curp.substring(0, 2));

    if (numericYear <= 99 && numericYear >= 80) {
      numericYear += 1900;
    } else {
      numericYear += 2000;
    }

    finalDate = numericYear + '-' + curp.substring(2, 4) + '-' + curp.substring(4, 6);
    return finalDate;
  }

}


