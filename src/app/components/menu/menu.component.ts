import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from './../../services/menu.service';
import { LoginService } from './../../services/login.service';
import { WizardService } from './../../services/wizard.service';
import { ContratoService } from './../../services/contrato.service';
import { CargaDocumentosService } from './../../services/carga-documentos.service';
import { FormularioRegistroService } from './../../services/formulario-registro.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  allFieldsAreValid: boolean;
  stepOneCompleted: boolean;
  // Menu service
  sessionType: string;
  isLogged: boolean;
  // Login service
  sendUser: string;

  constructor(private menuService: MenuService, private loginService: LoginService,
    private formularioRegistroService: FormularioRegistroService, private wizardService: WizardService,
    private cargaDocumentosService: CargaDocumentosService, private contratoService: ContratoService) {

  }

  ngOnInit() {
    this.menuService.currentSession.subscribe(session => this.sessionType = session);
    this.menuService.currentIsLogged.subscribe(status => this.isLogged = status);

    this.loginService.currentUser.subscribe(user => this.sendUser = user);

    this.formularioRegistroService.currentallFieldsAreValid.subscribe(value => this.allFieldsAreValid = value);

    this.wizardService.currentStepOne.subscribe(status => this.stepOneCompleted = status);
  }

  logout() {
    this.changeLoginStatus('guest', false);
    this.resetSteps();
  }

  changeLoginStatus(sessionType, isLogged) {
    this.menuService.changeSession(sessionType);
    this.menuService.changeLoginStatus(isLogged);
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

}
