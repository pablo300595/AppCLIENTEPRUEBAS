import { Component, OnInit, Inject } from '@angular/core';
import { Alumno } from './../../models/alumno';
import { AlumnoService} from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';
//import * as jsPDF from 'jspdf';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';



@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.css']
})
export class ModalViewComponent implements OnInit {

  panelOpenState = false;
  src = "/src/assets/imgs/curp.pdf";
  nss = "/src/assets/imgs/NSS.pdf";

  alumno: Alumno;
  alumnos: any;

  fieldLastNameFather: String;
  fieldLastNameMother: String;
  fieldFirstName: String;
  fieldPlaceBirth: String;
  fieldDateBirth: String;
  fieldStatusCivil: String;
  fieldEmail: String;
  fieldCURP: String;
  fieldNSS: Number;
  fieldStreet: String;
  fieldColony: String;
  fieldCity: String;
  fieldState: String;
  fieldPostalCode: Number;
  fieldPhone: Number;
  fieldEtnia: String;
  fieldOtherEtnia: String;
  fieldDisability: String;
  fieldWhichDisability: String;
  fieldSchool: String;
  fieldOtherSchool: String;
  fieldNameSchool: String;
  fieldAverage: Number;
  fieldCareer: String;
  fieldDocuments: String[] = [];
  statusInscripcion: String;

  idAlumnoLoged: String;
  constructor(private alumnoService: AlumnoService, private loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ModalViewComponent>
   ) { }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.alumnoService.getAlumnos()
    .subscribe(res => {
      this.alumnos = res as Alumno[];
      this.alumno = this.alumnos[0];

      this.fieldLastNameFather = this.alumno.lastNameFather;
      this.fieldLastNameMother = this.alumno.lastNameMother;
      this.fieldFirstName = this.alumno.firstName;
      this.fieldPlaceBirth = this.alumno.placeBirth;
      this.fieldDateBirth = this.alumno.dateBirth;
      this.fieldStatusCivil = this.alumno.statusCivil;
      this.fieldEmail = this.alumno.email;
      this.fieldCURP = this.alumno.curp;
      this.fieldNSS = this.alumno.nss;
      this.fieldStreet = this.alumno.street;
      this.fieldColony = this.alumno.colony;
      this.fieldCity = this.alumno.city;
      this.fieldState = this.alumno.state;
      this.fieldPostalCode = this.alumno.postalCode;
      this.fieldPhone = this.alumno.phone;
      this.fieldEtnia = this.alumno.etnia;
      this.fieldOtherEtnia = this.alumno.otherEtnia;
      this.fieldDisability = this.alumno.disability;
      this.fieldWhichDisability = this.alumno.whichDisability;
      this.fieldSchool = this.alumno.school;
      this.fieldOtherSchool = this.alumno.otherSchool;
      this.fieldNameSchool = this.alumno.nameSchool;
      this.fieldAverage = this.alumno.average;
      this.fieldCareer = this.alumno.career;
    });
  }
  

  closeDialog(){
    this.dialogRef.close(false);
  }

}
