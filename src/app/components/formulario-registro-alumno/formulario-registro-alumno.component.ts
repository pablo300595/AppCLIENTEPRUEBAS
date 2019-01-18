import { Component, OnInit } from '@angular/core';
import { AlumnoService} from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';
import { WizardService } from './../../services/wizard.service';
import { Alumno } from './../../models/alumno';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-formulario-registro-alumno',
  templateUrl: './formulario-registro-alumno.component.html',
  styleUrls: ['./formulario-registro-alumno.component.css']
})
export class FormularioRegistroAlumnoComponent implements OnInit {
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

  constructor(private alumnoService: AlumnoService, private loginService: LoginService, private wizardService: WizardService) {
    this.stepOneCompleted = false;
    this.firstTryGivenValues = false;
  }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.getAlumnoStatus();
    this.wizardService.currentStepOne.subscribe(status => this.stepOneCompleted = status);
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

  updateAlumno() {
    this.alumno = {
      lastNameFather: this.fieldLastNameFather,
      lastNameMother: this.fieldLastNameMother,
      firstName: this.fieldFirstName,
      placeBirth: this.fieldPlaceBirth,
      dateBirth: this.fieldDateBirth,
      statusCivil: this.fieldStatusCivil,
      email: this.fieldEmail,
      curp: this.fieldCURP,
      nss: this.fieldNSS,
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
    this.alumnoService.putAlumno(this.alumno, this.idAlumnoLoged)
        .subscribe();
        alert('Alumno actualizado con exito!!!');
  }

  evaluateIfStepOneCompleted() {
    this.firstTryGivenValues = true;
    this.stepOneCompleted =  (this.fieldLastNameFather.length > 1);

    if (this.stepOneCompleted) {
      this.updateAlumno();
      this.wizardService.changeStepOneStatus(true);
    } else {
      alert('hay campos no váldos');
    }
  }

}
