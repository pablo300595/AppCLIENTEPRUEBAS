import { Component, OnInit } from '@angular/core';
import { Alumno } from './../../models/alumno';
import { AlumnoService} from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';
// import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
  
})
export class ResumenComponent implements OnInit {
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
  constructor(private alumnoService: AlumnoService, private loginService: LoginService) { }

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

  downloadPDF() {
    /*const doc = new jsPDF();
    doc.text(this.fieldLastNameFather, 10, 10);
    doc.text(this.fieldLastNameMother, 10, 12);
    doc.text(this.fieldFirstName, 10, 14);
    doc.text(this.fieldPlaceBirth, 10, 16);
    doc.text(this.fieldDateBirth, 10, 18);
    doc.text(this.fieldStatusCivil, 10, 20);
    doc.text(this.fieldEmail, 10, 22);
    doc.text(this.fieldCURP, 10, 24);
    doc.text(this.fieldNSS, 10, 26);
    doc.text(this.fieldStreet, 10, 28);
    doc.text(this.fieldColony, 10, 30);
    doc.text(this.fieldCity, 10, 32);
    doc.text(this.fieldState, 10, 36);
    doc.text(this.fieldPostalCode, 10, 38);
    doc.text(this.fieldPhone, 10, 40);
    doc.text(this.fieldEtnia, 10, 42);
    doc.text(this.fieldOtherEtnia, 10, 44);
    doc.text(this.fieldDisability, 10, 46);
    doc.text(this.fieldWhichDisability, 10, 48);
    doc.text(this.fieldSchool, 10, 50);
    doc.text(this.fieldOtherSchool, 10, 52);
    doc.text(this.fieldNameSchool, 10, 54);
    doc.text(this.fieldAverage, 10, 56);
    doc.text(this.fieldCareer, 10, 58);
    doc.save('Test.pdf');*/
  }

}
