import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AlumnoService} from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';
import { WizardService } from './../../services/wizard.service';
import { FormularioRegistroService } from './../../services/formulario-registro.service';
import { Alumno } from './../../models/alumno';
import { NgForm} from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-formulario-registro-alumno',
  templateUrl: './formulario-registro-alumno.component.html',
  styleUrls: ['./formulario-registro-alumno.component.css']
})
export class FormularioRegistroAlumnoComponent implements OnInit {
  @Input() couper = 'hello';

  fieldLastNameFather: String;
  fieldLastNameMother: String;
  fieldFirstName: String;
  fieldControlNumber: any;
  fieldPlaceBirth: String;
  fieldDateBirth: String;
  fieldStatusCivil: String;
  fieldEmail: String;
  fieldCURP: String;
  fieldNSS: any;
  fieldStreet: String;
  fieldColony: String;
  fieldCity: String;
  fieldState: String;
  fieldPostalCode: any;
  fieldPhone: any;
  fieldEtnia: String ;
  fieldOtherEtnia: String;
  fieldDisability: String;
  fieldWhichDisability: String;
  fieldSchool: String ;
  fieldOtherSchool: String;
  fieldNameSchool: String;
  fieldAverage: Number;
  fieldCareer: String;

  fieldDocuments: String[] = [];
  statusInscripcion: String = '';

  // Services variables
  alumno: Alumno;
  alumnos: any;

  idAlumnoLoged: String;
  usuarioLoged: String;
  statusInscripcionAlumno: string;

  // Flags
  allFieldsAreValid: boolean;
  firstTryGivenValues: boolean;

  constructor(private alumnoService: AlumnoService, private loginService: LoginService,
    private wizardService: WizardService,
    private formularioRegistroService: FormularioRegistroService) {
    this.firstTryGivenValues = false;
    this.initServices();
  }

  ngOnInit() {

  }

  initServices() {
    this.loginService.currentUser.subscribe(user => this.usuarioLoged = user);
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.getAlumnoStatus();
    this.wizardService.currentStepOne.subscribe(status => this.allFieldsAreValid = status);
    this.formularioRegistroService.currentalumnoToUpdate.subscribe(alumnoToUpdate => this.alumno = alumnoToUpdate);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.formularioRegistroService.currentallFieldsAreValid.subscribe(value => this.allFieldsAreValid = value);

    this.formularioRegistroService.currentfieldLastNameFather.subscribe(value => this.fieldLastNameFather = value);
    this.formularioRegistroService.currentfieldLastNameMother.subscribe(value => this.fieldLastNameMother = value);
    this.formularioRegistroService.currentfieldFirstName.subscribe(value => this.fieldFirstName = value);
    this.formularioRegistroService.currentfieldPlaceBirth.subscribe(value => this.fieldPlaceBirth = value);
    this.formularioRegistroService.currentfieldDateBirth.subscribe(value => this.fieldDateBirth = value);
    this.formularioRegistroService.currentfieldStatusCivil.subscribe(value => this.fieldStatusCivil = value);
    this.formularioRegistroService.currentfieldEmail.subscribe(value => this.fieldEmail = value);
    this.formularioRegistroService.currentfieldCURP.subscribe(value => this.fieldCURP = value);
    this.formularioRegistroService.currentfieldNSS.subscribe(value => this.fieldNSS = value);
    this.formularioRegistroService.currentfieldStreet.subscribe(value => this.fieldStreet = value);
    this.formularioRegistroService.currentfieldColony.subscribe(value => this.fieldColony = value);
    this.formularioRegistroService.currentfieldCity.subscribe(value => this.fieldCity = value);
    this.formularioRegistroService.currentfieldState.subscribe(value => this.fieldState = value);
    this.formularioRegistroService.currentfieldPostalCode.subscribe(value => this.fieldPostalCode = value);
    this.formularioRegistroService.currentfieldPhone.subscribe(value => this.fieldPhone = value);
    this.formularioRegistroService.currentfieldEtnia.subscribe(value => this.fieldEtnia = value);
    this.formularioRegistroService.currentfieldOtherEtnia.subscribe(value => this.fieldOtherEtnia = value);
    this.formularioRegistroService.currentfieldDisability.subscribe(value => this.fieldDisability = value);
    this.formularioRegistroService.currentfieldWhichDisability.subscribe(value => this.fieldWhichDisability = value);
    this.formularioRegistroService.currentfieldSchool.subscribe(value => this.fieldSchool = value);
    this.formularioRegistroService.currentfieldOtherSchool.subscribe(value => this.fieldOtherSchool = value);
    this.formularioRegistroService.currentfieldNameSchool.subscribe(value => this.fieldNameSchool = value);
    this.formularioRegistroService.currentfieldAverage.subscribe(value => this.fieldAverage = value);
    this.formularioRegistroService.currentfieldCareer.subscribe(value => this.fieldCareer = value);
  }

  getAlumnoStatus() {
    this.alumnoService.getAlumnoStatusInscripcion(this.idAlumnoLoged)
    .subscribe(res => {
      let newres: any = res;
      newres = newres.statusInscripcion;
      const status = (newres).toString();

      this.loginService.changeStatusInscripcion(status);
      this.loginService.currentStatusInscripcionSource.subscribe(stat => this.statusInscripcionAlumno = stat);
    });
  }

  evaluateIfallFieldsAreValid() {
    this.allFieldsAreValid =  (this.fieldLastNameFather.length > 1 && this.fieldFirstName.length > 1 &&
      this.fieldControlNumber != null && this.fieldPlaceBirth.length > 1  && this.fieldEmail.length > 1 &&
      this.fieldCURP.length > 1 && this.fieldNSS != null && this.fieldStreet.length > 1 &&
      this.fieldColony.length > 1 && this.fieldCity.length > 1 && this.fieldPostalCode != null &&
      this.fieldPhone != null && this.fieldAverage > 0 && this.fieldNameSchool != null &&
      this.fieldAverage <= 100 && this.fieldAverage != null && this.fieldNameSchool.length > 1 &&
      this.fieldPhone != null);

    if (this.allFieldsAreValid) {
      if ((this.fieldEtnia === 'SI')) {
        this.allFieldsAreValid = this.allFieldsAreValid && this.fieldOtherEtnia.length > 1;
      }
      if ((this.fieldDisability === 'SI')) {
        this.allFieldsAreValid = this.allFieldsAreValid && this.fieldWhichDisability.length > 1;
      }
      if (!this.allFieldsAreValid) {
        return;
      }

      this.formularioRegistroService.changeallFieldsAreValid(true);
      this.alumno = {
        lastNameFather: this.fieldLastNameFather,
        lastNameMother: this.fieldLastNameMother,
        firstName: this.fieldFirstName,
        controlNumber: this.fieldControlNumber,
        placeBirth: this.fieldPlaceBirth,
        dateBirth: this.extractBirthFromCURP(this.fieldCURP.substring(4, 10)),
        statusCivil: this.fieldStatusCivil,
        email: this.fieldEmail,
        curp: this.fieldCURP,
        nss: this.fieldNSS,
        sex: this.fieldCURP.substring(10, 11),
        street: this.fieldStreet,
        colony: this.fieldColony,
        city: this.fieldCity,
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
        documents: this.fieldDocuments,
        statusInscripcion: this.statusInscripcionAlumno
      };

      this.formularioRegistroService.changeAlumnoToUpdate(this.alumno);
    } else {
      // Do nothing
    }
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

  downloadPDF() {
    console.log('PDF');
    
    const doc = new jsPDF();
    const font = doc.getFontList();
    // Cuadro 1
    doc.setDrawColor(0);
    doc.setFillColor(0, 0, 0);
    doc.rect(10, 65, 190, 10, 'f');

    doc.setDrawColor(0);
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 75, 190, 45, 'f');

    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.setFont('Times');
    doc.setFontType('bold');
    doc.text(15, 72, 'Datos Generales');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Times');

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
    doc.text('Correo Electronico: ', 15, 100);
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
    doc.text('Numero de control: ', 15, 115);
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
    doc.setFont('Times');
    doc.setFontType('bold');
    doc.text(15, 132, 'Direccn');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Times');

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
    doc.text('Codigo Postal: ', 15, 160);
    doc.setFontType('normal');
    doc.text(this.fieldPostalCode + '', 80, 160);

    doc.setFontType('bold');
    doc.text('Telefono: ', 15, 165);
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
    doc.setFont('Times');
    doc.setFontType('bold');
    doc.text(15, 182, 'Datos academicos');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Times');

    doc.setFontType('bold');
    doc.text('Escuela de procedencia: ', 15, 190);
    doc.setFontType('normal');
    doc.text(this.fieldSchool + ': ' + this.fieldNameSchool, 80, 190);

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
    doc.setFont('Times');
    doc.setFontType('bold');
    doc.text(15, 222, 'Datos extras');

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Times');

    doc.setFontType('bold');
    doc.text('¿Perteneces a alguna Etnia? ', 15, 230);
    doc.setFontType('normal');
    doc.text(this.fieldEtnia, 80, 230);

    doc.setFontType('bold');
    doc.text('¿Cual?', 15, 235);
    doc.setFontType('normal');
    doc.text(this.fieldOtherEtnia, 80, 235);

    doc.setFontType('bold');
    doc.text('¿Tienes alguna discapacidad? ', 15, 240);
    doc.setFontType('normal');
    doc.text(this.fieldDisability, 80, 240);

    doc.setFontType('bold');
    doc.text('¿Cual?', 15, 245);
    doc.setFontType('normal');
    doc.text(this.fieldWhichDisability, 80, 245);
    // SAVING
    // doc.save('FORMULARIO.pdf');
    const data = new Blob(['\ufeff', doc.output()], {
      type: 'application/pdf'
    });
    const formData = new FormData();
    formData.append('file', data, 'FORMULARIO.pdf');
    formData.append('usuario', this.usuarioLoged + '');
    formData.append('filename', 'FORMULARIO.pdf');
    const request = new XMLHttpRequest();
    request.open('POST', 'https://app-apipruebas.herokuapp.com/upload'); // Change to your server
    request.send(formData);
  }

}
