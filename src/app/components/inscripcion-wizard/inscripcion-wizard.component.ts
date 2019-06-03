import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from './../../services/alumno.service';
import { WizardService } from './../../services/wizard.service';
import { MessagesService } from './../../services/messages.service';
import { LoginService } from './../../services/login.service';
import { FormularioRegistroService } from './../../services/formulario-registro.service';
import { ContratoService } from './../../services/contrato.service';
import { CargaDocumentosService } from './../../services/carga-documentos.service';
import { PeriodoService } from './../../services/periodo.service';
import { Alumno } from './../../models/alumno';
import { TemplateWizardComponent } from './../subcomponents/template-wizard/template-wizard.component';
import { ResumenComponent } from '../resumen/resumen.component';
import { TemplateLinkDownloadsComponent } from '../subcomponents/template-link-downloads/template-link-downloads.component';
import { DialogService } from 'src/app/services/dialog.service';
import { ContratoComponent } from '../contrato/contrato.component';

@Component({
  selector: 'app-inscripcion-wizard',
  templateUrl: './inscripcion-wizard.component.html',
  styleUrls: ['./inscripcion-wizard.component.css']
})
export class InscripcionWizardComponent implements OnInit {
  @ViewChild(ResumenComponent) resumen: ResumenComponent;
  @ViewChild(TemplateLinkDownloadsComponent) links: TemplateLinkDownloadsComponent;
  @ViewChild(ContratoComponent) contrato: ContratoComponent;

  stepOneCompleted: boolean;
  stepTwoCompleted: boolean;
  stepThreeCompleted: boolean;
  stepFourCompleted: boolean;
  // Services variables
  alumnoToUpdate: Alumno;
  idAlumnoLoged: String;
  currentPeriods: any;

  firstTryGivenValues: boolean;
  alumnoStatus: String;


  constructor(private alumnoService: AlumnoService, private loginService: LoginService, private wizardService: WizardService,
    private formularioRegistroService: FormularioRegistroService, private messagesService: MessagesService,
    private contratoService: ContratoService, private cargaDocumentosService: CargaDocumentosService,
    private periodoService: PeriodoService, private router: Router,
    private dialogService: DialogService) {
    this.initServices();
  }

  ngOnInit() {

  }

  initServices() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.wizardService.currentStepOne.subscribe(status => this.stepOneCompleted = status);
    this.wizardService.currentStepTwo.subscribe(status => this.stepTwoCompleted = status);
    this.wizardService.currentStepThree.subscribe(status => this.stepThreeCompleted = status);
    this.wizardService.currentStepFour.subscribe(status => this.stepFourCompleted = status);
    this.formularioRegistroService.currentalumnoToUpdate.subscribe(alumnoToUpdate => this.alumnoToUpdate = alumnoToUpdate);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.formularioRegistroService.currentallFieldsAreValid.subscribe(value => this.stepOneCompleted = value);
    this.contratoService.currentAcceptedTerms.subscribe(accepted => this.stepThreeCompleted = accepted);
    this.alumnoService.getAlumnoStatusInscripcion(this.idAlumnoLoged).subscribe(
      res => {
        let newres: any = res;
        newres = newres.statusInscripcion;
        this.alumnoStatus = (newres).toString();
      }
    );
    this.periodoService.getPeriodos().subscribe(res => this.currentPeriods = res);
  }

  updateAlumno() {
    this.formularioRegistroService.changefirstTryGivenValues(true);
    if (!this.stepOneCompleted) {
      this.messagesService.warning('¡Hay campos obligatorios por completar! Favor de ingresarlos y volver a intentar.');
      return;
    }
    this.alumnoService.putAlumno(this.alumnoToUpdate, this.idAlumnoLoged)
      .subscribe();
    this.messagesService.success('¡Alumno actualizado con exito!');
    this.wizardService.changeStepOneStatus(true);
    this.formularioRegistroService.changefirstTryGivenValues(false);
  }

  checkStepTwo() {
    if (this.stepTwoCompleted) {
      this.messagesService.success('¡Documentos cargados de forma correcta!');
      this.contrato.loadAlumnoData();
    } else {
      this.messagesService.warning(`¡Hay documentos pendientes por cargar! Favor de revisar que todos los documentos
      tengan el icono de cargado`);
    }
  }

  checkStepThree() {
    if (this.stepThreeCompleted) {
      this.messagesService.success('¡Contrato ha sido aceptado!');
      this.resumen.initResumen();
    } else {
      this.messagesService.warning('¡Los términos y condiciones deben ser aceptados antes de poder continuar!');
    }
  }

  checkStepFour() {
    this.stepFourCompleted = true;
    this.links.loadLink();
    this.messagesService.success('¡Resumen observado!');
  }

  resetSteps() {
    this.wizardService.changeStepOneStatus(false);
    /* STEP 1*/
    this.formularioRegistroService.changefieldAverage(70);
    this.formularioRegistroService.changefieldCareer('Ingeniería en Sistemas Computacionales');
    this.formularioRegistroService.changefieldCity('');
    this.formularioRegistroService.changefieldColony('');
    this.formularioRegistroService.changefieldCURP('');
    this.formularioRegistroService.changefieldDateBirth('');
    this.formularioRegistroService.changefieldDisability('NO');
    this.formularioRegistroService.changefieldEmail('');
    this.formularioRegistroService.changefieldFirstName('');
    this.formularioRegistroService.changefieldLastNameFather('');
    this.formularioRegistroService.changefieldLastNameMother('');
    this.formularioRegistroService.changefieldNameSchool('');
    this.formularioRegistroService.changefieldNSS(1234);
    this.formularioRegistroService.changefieldOtherEtnia('');
    this.formularioRegistroService.changefieldOtherSchool('');
    this.formularioRegistroService.changefieldPhone(311123456);
    this.formularioRegistroService.changefieldPlaceBirth('');
    this.formularioRegistroService.changefieldPostalCode(63000);
    this.formularioRegistroService.changefieldSchool('CETIS');
    this.formularioRegistroService.changefieldState('Nayarit');
    this.formularioRegistroService.changefieldStatusCivil('Soltero/a');
    this.formularioRegistroService.changefieldStreet('');
    this.formularioRegistroService.changefieldWhichDisability('');
    this.formularioRegistroService.changefieldControlNumber('');
    this.formularioRegistroService.changeallFieldsAreValid(false);
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
    /* STEP 3 */
    this.wizardService.changeStepThreeStatus(false);
    this.contratoService.changeAcceptedTerms(false);

    this.wizardService.changeStepFourStatus(false);
  }

  finishSteps() {
    this.dialogService.openNotificationDialog
      ('Una vez terminado el proceso, debes entrar al sistema constantemente para la validación de documentos.')
      .afterClosed().subscribe(res => {
        if (res) {
          let alumno = new Alumno();
          alumno = { statusInscripcion: 'Enviado' };
          this.alumnoService.putStatusAlumno(alumno, this.idAlumnoLoged).subscribe(
            res => this.messagesService.success('Status de alumno ha cambiado a enviado')
          );
          this.asignPeriod();
          this.alumnoService.initAlumnoDocumentation(this.idAlumnoLoged).subscribe();
          this.resetSteps();
          this.router.navigateByUrl('/');
        }
      });
  }

  asignPeriod() {
    for (let i = 0; i < this.currentPeriods.length; i++) {
      if (this.currentPeriods[i].activo) {
        this.alumnoService.updateAlumnoPeriodById(this.idAlumnoLoged, { periodo: this.currentPeriods[i]._id }).subscribe();
      }
    }
  }

}
