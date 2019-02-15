import { Component, OnInit, Inject } from '@angular/core';
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
  constructor(private alumnoService: AlumnoService, private loginService: LoginService
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

 
    
  

/*
  downloadPDF() {
    console.log('PDF');
    const doc = new jsPDF();

    // Cuadro 1
    doc.setDrawColor(0);
    doc.setFillColor(0, 0, 0);
    doc.rect(10, 65, 190, 10, 'f');

    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 75, 190, 45, 'f');

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont('arial');
    doc.setFontType('bold');
    doc.text(15, 72, 'Datos Generales');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('times');

    doc.setFontType('bold');
    doc.text('Nombre: ', 15, 80);
    doc.setFontType('normal');
    doc.text(this.fieldLastNameFather + ' ' + this.fieldLastNameMother + ' ' + this.fieldFirstName, 80, 80);

    doc.setFontType('bold');
    doc.text('Lugar de nacimiento: ', 15, 85);
    doc.setFontType('normal');
    doc.text(this.fieldPlaceBirth, 80, 85);

    doc.setFontType('bold');
    doc.text('Fecha de nacimiento: ', 15, 90);
    doc.setFontType('normal');
    doc.text(this.fieldDateBirth, 80, 90);

    doc.setFontType('bold');
    doc.text('Estado Civil: ', 15, 95);
    doc.setFontType('normal');
    doc.text(this.fieldStatusCivil, 80, 95);

    doc.setFontType('bold');
    doc.text('Correo Electrónico: ', 15, 100);
    doc.setFontType('normal');
    doc.text(this.fieldEmail, 80, 100);

    doc.setFontType('bold');
    doc.text('CURP: ', 15, 105);
    doc.setFontType('normal');
    doc.text(this.fieldCURP, 80, 105);

    doc.setFontType('bold');
    doc.text('NSS: ', 15, 110);
    doc.setFontType('normal');
    doc.text(this.fieldNSS + '', 80, 110);

    doc.setFontType('bold');
    doc.text('Número de control: ', 15, 115);
    doc.setFontType('normal');
    doc.text('13400501', 80, 115);

    // Cuadro 2
    doc.setDrawColor(0);
    doc.setFillColor(0, 0, 0);
    doc.rect(10, 125, 190, 10, 'f');

    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 135, 190, 35, 'f');

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont('arial');
    doc.setFontType('bold');
    doc.text(15, 132, 'Dirección');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('times');

    doc.setFontType('bold');
    doc.text('Calle: ', 15, 140);
    doc.setFontType('normal');
    doc.text(this.fieldStreet, 80, 140);

    doc.setFontType('bold');
    doc.text('Colonia: ', 15, 145);
    doc.setFontType('normal');
    doc.text(this.fieldColony, 80, 145);

    doc.setFontType('bold');
    doc.text('Ciudad: ', 15, 150);
    doc.setFontType('normal');
    doc.text(this.fieldCity, 80, 150);

    doc.setFontType('bold');
    doc.text('Estado: ', 15, 155);
    doc.setFontType('normal');
    doc.text(this.fieldState, 80, 155);

    doc.setFontType('bold');
    doc.text('Código Postal: ', 15, 160);
    doc.setFontType('normal');
    doc.text(this.fieldPostalCode + '', 80, 160);

    doc.setFontType('bold');
    doc.text('Teléfono: ', 15, 165);
    doc.setFontType('normal');
    doc.text(this.fieldPhone + '', 80, 165);

    // Cuadro 3
    doc.setDrawColor(0);
    doc.setFillColor(0, 0, 0);
    doc.rect(10, 175, 190, 10, 'f');

    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 185, 190, 25, 'f');

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont('arial');
    doc.setFontType('bold');
    doc.text(15, 182, 'Datos académicos');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('times');

    doc.setFontType('bold');
    doc.text('Escuela de procedencia: ', 15, 190);
    doc.setFontType('normal');
    doc.text(this.fieldSchool + ': ' + this.fieldNameSchool , 80, 190);

    doc.setFontType('bold');
    doc.text('Otra: ', 15, 195);
    doc.setFontType('normal');
    doc.text(this.fieldOtherSchool, 80, 195);

    doc.setFontType('bold');
    doc.text('Promedio: ', 15, 200);
    doc.setFontType('normal');
    doc.text(this.fieldAverage + '', 80, 200);

    doc.setFontType('bold');
    doc.text('Carrera a cursar: ', 15, 205);
    doc.setFontType('normal');
    doc.text(this.fieldCareer, 80, 205);

    // Cuadro 4
    doc.setDrawColor(0);
    doc.setFillColor(0, 0, 0);
    doc.rect(10, 215, 190, 10, 'f');

    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 225, 190, 25, 'f');

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont('arial');
    doc.setFontType('bold');
    doc.text(15, 222, 'Datos extras');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('times');

    doc.setFontType('bold');
    doc.text('¿Perteneces a alguna Etnia? ', 15, 230);
    doc.setFontType('normal');
    doc.text(this.fieldEtnia, 80, 230);

    doc.setFontType('bold');
    doc.text('¿Cuál?', 15, 235);
    doc.setFontType('normal');
    doc.text(this.fieldOtherEtnia, 80, 235);

    doc.setFontType('bold');
    doc.text('¿Tienes alguna discapacidad? ', 15, 240);
    doc.setFontType('normal');
    doc.text(this.fieldDisability, 80, 240);

    doc.setFontType('bold');
    doc.text('¿Cuál?', 15, 245);
    doc.setFontType('normal');
    doc.text(this.fieldWhichDisability, 80, 245);
    doc.save('Test.pdf');
  }
*/
}
