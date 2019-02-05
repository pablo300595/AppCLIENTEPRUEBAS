import { Component, OnInit } from '@angular/core';
import { AlumnoService} from './../../services/alumno.service';
import { WizardService } from './../../services/wizard.service';
import { MessagesService } from './../../services/messages.service';
import { LoginService } from './../../services/login.service';
import { FormularioRegistroService } from './../../services/formulario-registro.service';
import { ContratoService } from './../../services/contrato.service';
import { CargaDocumentosService } from './../../services/carga-documentos.service';
import { Alumno } from './../../models/alumno';
import { TemplateWizardComponent } from './../subcomponents/template-wizard/template-wizard.component';


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
    private formularioRegistroService: FormularioRegistroService, private messagesService: MessagesService,
    private contratoService: ContratoService, private cargaDocumentosService: CargaDocumentosService) { }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.wizardService.currentStepOne.subscribe(status => this.stepOneCompleted = status);
    this.wizardService.currentStepTwo.subscribe(status => this.stepTwoCompleted = status);
    this.wizardService.currentStepThree.subscribe(status => this.stepThreeCompleted = status);
    this.wizardService.currentStepFour.subscribe(status => this.stepFourCompleted = status);
    this.formularioRegistroService.currentalumnoToUpdate.subscribe(alumnoToUpdate => this.alumnoToUpdate = alumnoToUpdate);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.formularioRegistroService.currentallFieldsAreValid.subscribe(value => this.stepOneCompleted = value);
    this.contratoService.currentAcceptedTerms.subscribe(accepted => this.stepThreeCompleted = accepted);

  }

  updateAlumno() {
    this.formularioRegistroService.changefirstTryGivenValues(true);
    if (!this.stepOneCompleted) {
      this.messagesService.warning('Hay campos obligatorios por completar!!!\n Favor de ingresarlos y volver a intentar');
      return;
    }
    this.alumnoService.putAlumno(this.alumnoToUpdate, this.idAlumnoLoged)
        .subscribe();
    this.formularioRegistroService.changefirstTryGivenValues(false);
    this.messagesService.success('Alumno actualizado con exito!!!');
    this.wizardService.changeStepOneStatus(true);
  }

  checkStepTwo() {
    if (this.stepTwoCompleted) {
      this.messagesService.success('Documentos cargados de forma correcta!!!');
    } else {
      this.messagesService.warning(`Hay documentos pendientes por carrgar!!!\nLos documentos pendientes
      no tienen una imagen que confirma su carga`);
    }
  }

  checkStepThree() {
    if (this.stepThreeCompleted) {
      this.messagesService.success('Contrato aceptado!!!');
    } else {
      this.messagesService.warning('Los términos y condiciones deben ser aceptados antes de poder continuar!!!');
    }
  }

  checkStepFour() {
    this.stepFourCompleted = true;
  }

  resetSteps() {
    this.wizardService.changeStepOneStatus(false);
    this.wizardService.changeStepTwoStatus(false);
    /* STEP 2*/
    this.cargaDocumentosService.changeFile1(false);
    this.cargaDocumentosService.changeFile2(false);
    this.cargaDocumentosService.changeFile3(false);
    this.cargaDocumentosService.changeFile4(false);
    this.cargaDocumentosService.changeFile5(false);
    this.cargaDocumentosService.changeFile6(false);
    this.cargaDocumentosService.changeFile7(false);
    this.cargaDocumentosService.changeStringFile1('');
    this.cargaDocumentosService.changeStringFile2('');
    this.cargaDocumentosService.changeStringFile3('');
    this.cargaDocumentosService.changeStringFile4('');
    this.cargaDocumentosService.changeStringFile5('');
    this.cargaDocumentosService.changeStringFile6('');
    this.cargaDocumentosService.changeStringFile7('');
    /* STEP 2 */
    this.wizardService.changeStepThreeStatus(false);
    this.wizardService.changeStepFourStatus(false);
  }

}
