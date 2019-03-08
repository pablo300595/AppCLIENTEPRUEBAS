import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Alumno } from './../../models/alumno';
import { AlumnoService} from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';
import * as jsPDF from 'jspdf';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  panelOpenState = false;
  acta: string;
  certificado: string;
  clinicos: string;
  comprobante: string;
  curp: string;
  foto: string;
  nss: string;
  // src = './../../../assets/images/curp.pdf';
  // nss = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  // src = 'https://files.000webhost.com/13400501/documentos/CURP.pdf';
  // src = 'https://filetestresidence.000webhostapp.com/Glossary_English_MOOCs.pdf';
  // nss = './../../../assets/images/NSS.pdf';


  alumnos: any;

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


  // Services variables
  alumno: Alumno;
  selectedNoCtrl: String;
  firstTryGivenValues: boolean;

  idAlumnoLoged: String;
  currentUser: String;

  constructor(private alumnoService: AlumnoService, private loginService: LoginService
   ) { }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
  }

  initResumen() {
    this.acta = `https://filetestresidence.000webhostapp.com/13400501/documentos/ACTA.pdf`;
    this.certificado = `https://filetestresidence.000webhostapp.com/13400501/documentos/CERTIFICADO.pdf`;
    this.clinicos  = `https://filetestresidence.000webhostapp.com/13400501/documentos/CLINICOS.pdf`;
    this.comprobante  = `https://filetestresidence.000webhostapp.com/13400501/documentos/COMPROBANTE.pdf`;
    this.curp  = `https://filetestresidence.000webhostapp.com/13400501/documentos/CURP.pdf`;
    this.foto  = `https://filetestresidence.000webhostapp.com/13400501/documentos/FOTO.png`;
    this.nss  = `https://filetestresidence.000webhostapp.com/13400501/documentos/NSS.pdf`;

    this.alumnoService.getAlumnoById(this.idAlumnoLoged)
    .subscribe(res => {
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

}
