import { Component, OnInit, Input, EventEmitter } from '@angular/core';
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
    this.allFieldsAreValid =  (this.fieldLastNameFather.length > 1 &&
      this.fieldLastNameMother.length > 1 && this.fieldFirstName.length > 1 &&
      this.fieldControlNumber.length > 1 && this.fieldPlaceBirth.length > 1  && this.fieldEmail.length > 1 &&
      this.fieldCURP.length > 1 && this.fieldStreet.length > 1 &&
      this.fieldColony.length > 1 && this.fieldCity.length > 1 &&
      this.fieldNameSchool.length > 1 && this.fieldAverage > 0 &&
      this.fieldPostalCode != null && this.fieldPostalCode > 0 &&
      this.fieldAverage <= 100 && this.fieldAverage != null &&
      this.fieldPhone > 0 && this.fieldPhone != null &&
      this.fieldControlNumber.length > 1);

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
