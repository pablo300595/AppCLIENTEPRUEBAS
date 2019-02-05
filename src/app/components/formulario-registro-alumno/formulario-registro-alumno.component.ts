import { Component, OnInit } from '@angular/core';
import { AlumnoService} from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';
import { WizardService } from './../../services/wizard.service';
import { MessagesService } from './../../services/messages.service';
import { FormularioRegistroService } from './../../services/formulario-registro.service';
import { Alumno } from './../../models/alumno';
import { NgForm} from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-formulario-registro-alumno',
  templateUrl: './formulario-registro-alumno.component.html',
  styleUrls: ['./formulario-registro-alumno.component.css']
})
export class FormularioRegistroAlumnoComponent implements OnInit {
  fieldLastNameFather: String = 'Valenzuela';
  fieldLastNameMother: String = 'Miramontes';
  fieldFirstName: String = 'Jose Pablo';
  fieldControlNumber: String = '13400409';
  fieldPlaceBirth: String = 'Tepic, Nayarit';
  fieldDateBirth: String = '';
  fieldStatusCivil: String = 'Soltero/a';
  fieldEmail: String = 'pabloeng05@gmail.com';
  fieldCURP: String = 'VAMP950530HNTLRB09';
  fieldNSS: Number = 86169562542;
  fieldStreet: String = 'Calcio';
  fieldColony: String = '10 de Mayo';
  fieldCity: String = 'Xalisco';
  fieldState: String = 'Nayarit';
  fieldPostalCode: Number = 63780;
  fieldPhone: Number = 3112617945;
  fieldEtnia: String = 'NO';
  fieldOtherEtnia: String = '';
  fieldDisability: String = 'NO';
  fieldWhichDisability: String = '';
  fieldSchool: String = 'CETIS';
  fieldOtherSchool: String = '';
  fieldNameSchool: String = '';
  fieldAverage: Number = 100;
  fieldCareer: String = 'Ingeniería en Sistemas Computacionales';
  fieldDocuments: String[] = [];
  statusInscripcion: String = '';

  // Services variables
  alumno: Alumno;
  alumnos: any;

  idAlumnoLoged: String;
  statusInscripcionAlumno: string;
  // Error messages

  // Flags
  allFieldsAreValid: boolean;
  firstTryGivenValues: boolean;

  constructor(private alumnoService: AlumnoService, private loginService: LoginService,
    private wizardService: WizardService, private messagesService: MessagesService,
    private formularioRegistroService: FormularioRegistroService) {
    this.firstTryGivenValues = false;
  }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.getAlumnoStatus();
    this.wizardService.currentStepOne.subscribe(status => this.allFieldsAreValid = status);
    this.formularioRegistroService.currentalumnoToUpdate.subscribe(alumnoToUpdate => this.alumno = alumnoToUpdate);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.formularioRegistroService.currentallFieldsAreValid.subscribe(value => this.allFieldsAreValid = value);
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
    this.allFieldsAreValid =  (this.fieldLastNameFather.length > 1 &&
      this.fieldLastNameMother.length > 1 && this.fieldFirstName.length > 1 &&
      this.fieldControlNumber.length > 1 && this.fieldPlaceBirth.length > 1  && this.fieldEmail.length > 1 &&
      this.fieldCURP.length > 1 && this.fieldStreet.length > 1 &&
      this.fieldColony.length > 1 && this.fieldCity.length > 1 &&
      this.fieldNameSchool.length > 1 && this.fieldAverage > 0 &&
      this.fieldAverage <= 100);

    if (this.allFieldsAreValid) {
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
      // this.updateAlumno();
      // this.wizardService.changeStepOneStatus(true);
    } else {
      // this.messagesService.warning('hay campos no váldos');
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

}
