import { Component, OnInit } from '@angular/core';
import { AlumnoService} from './../../services/alumno.service';
import { WizardService } from './../../services/wizard.service';
import { MessagesService } from './../../services/messages.service';
import { LoginService } from './../../services/login.service';
import { FormularioRegistroService } from './../../services/formulario-registro.service';
import { Alumno } from './../../models/alumno';

@Component({
  selector: 'app-inscripcion-wizard',
  templateUrl: './inscripcion-wizard.component.html',
  styleUrls: ['./inscripcion-wizard.component.css']
})
export class InscripcionWizardComponent implements OnInit {
  stepOneCompleted: boolean;
  stepTwoCompleted: boolean;
  stepThreeCompleted: boolean;
  stepFourCompleted: boolean;
  // Services variables
  alumnoToUpdate: Alumno;
  idAlumnoLoged: String;
  firstTryGivenValues: boolean;
  constructor(private alumnoService: AlumnoService, private loginService: LoginService, private wizardService: WizardService,
    private formularioRegistroService: FormularioRegistroService, private messagesService: MessagesService) { }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.wizardService.currentStepOne.subscribe(status => this.stepOneCompleted = status);
    this.wizardService.currentStepTwo.subscribe(status => this.stepTwoCompleted = status);
    this.wizardService.currentStepThree.subscribe(status => this.stepThreeCompleted = status);
    this.wizardService.currentStepFour.subscribe(status => this.stepFourCompleted = status);
    this.formularioRegistroService.currentalumnoToUpdate.subscribe(alumnoToUpdate => this.alumnoToUpdate = alumnoToUpdate);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.formularioRegistroService.currentallFieldsAreValid.subscribe(value => this.stepOneCompleted = value);
  }

  updateAlumno() {
    this.formularioRegistroService.changefirstTryGivenValues(true);
    if (!this.stepOneCompleted) {
      this.messagesService.warning('Aun no se ha completado este paso!!!');
      return;
    }
    this.alumnoService.putAlumno(this.alumnoToUpdate, this.idAlumnoLoged)
        .subscribe();
    this.messagesService.success('Alumno actualizado con exito!!!');
    this.wizardService.changeStepOneStatus(true);
  }

  checkStepTwo() {
    if (this.stepTwoCompleted) {
      this.messagesService.success('Documentos cargados de forma correcta!!!');
    } else {
      this.messagesService.warning('Aun no se ha completado este paso!!!');
    }
  }

}
