import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { MessagesService } from './../../services/messages.service';
import { WizardService } from './../../services/wizard.service';
import { DropzoneTemplatesService } from './../../services/dropzone-templates.service';

import { PdfTemplatePhotoComponent } from './../subcomponents/pdf-template-photo/pdf-template-photo.component';
import { PdfTemplateNssComponent } from './../subcomponents/pdf-template-nss/pdf-template-nss.component';
import { PdfTemplateComprobanteComponent } from './../subcomponents/pdf-template-comprobante/pdf-template-comprobante.component';
import { PdfTemplateCurpComponent } from './../subcomponents/pdf-template-curp/pdf-template-curp.component';
import { PdfTemplateClinicosComponent } from './../subcomponents/pdf-template-clinicos/pdf-template-clinicos.component';
import { PdfTemplateCertificadoComponent } from './../subcomponents/pdf-template-certificado/pdf-template-certificado.component';
import { PdfTemplateActaComponent } from './../subcomponents/pdf-template-acta/pdf-template-acta.component';



import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const URL = 'http://localhost:3000/upload';

@Component({
  selector: 'app-carga-documentos',
  templateUrl: './carga-documentos.component.html',
  styleUrls: ['./carga-documentos.component.css']
})
export class CargaDocumentosComponent implements OnInit {
  idAlumnoLoged: String;
  userLoged: String;

  file1: boolean;
  file2: boolean;
  file3: boolean;
  file4: boolean;
  file5: boolean;
  file6: boolean;
  file7: boolean;
  stepTwoCompleted: boolean;


  /* Dropzone conf */
  public type = 'component';
  public config: DropzoneConfigInterface;
  @ViewChild(DropzoneComponent) componentRef?: DropzoneComponent;

  public config1: DropzoneConfigInterface;
  public config2: DropzoneConfigInterface;
  public config3: DropzoneConfigInterface;
  public config4: DropzoneConfigInterface;
  public config5: DropzoneConfigInterface;
  public config6: DropzoneConfigInterface;

  dropzoneFileNameCERTIFICADO: any;
  dropzoneFileNameACTA: any;
  dropzoneFileNameCURP: any;
  dropzoneFileNameCOMPROBANTE: any;
  dropzoneFileNameANALISIS: any;
  dropzoneFileNamePhoto: any;
  dropzoneFileNameNSS: any;

  constructor(private loginService: LoginService, private wizardService: WizardService,
    private messagesService: MessagesService, private dropzoneTemplatesService: DropzoneTemplatesService) {
    this.stepTwoCompleted = false;
  }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.loginService.currentUser.subscribe(user => this.userLoged = user);

    this.wizardService.currentStepTwo.subscribe(status => this.stepTwoCompleted = status);

    /*Dropzone*/
    this.config = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'CERTIFICADO.pdf'},
      accept: (file, done) => {this.dropzoneFileNameCERTIFICADO = file.name; this.file1 = true; done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config1 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'ACTA.pdf'},
      accept: (file, done) => {this.dropzoneFileNameACTA = file.name; this.file2 = true; done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config2 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'CURP.pdf'},
      accept: (file, done) => {this.dropzoneFileNameCURP = file.name; this.file3 = true; done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config3 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'COMPROBANTE.pdf'},
      accept: (file, done) => {this.dropzoneFileNameCOMPROBANTE = file.name; this.file4 = true; done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config4 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'CLINICOS.pdf'},
      accept: (file, done) => {this.dropzoneFileNameANALISIS = file.name; this.file5 = true; done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config5 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'FOTO.pdf'},
      accept: (file, done) => {this.dropzoneFileNamePhoto = file.name; this.file6 = true; done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config6 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'NSS.pdf'},
      accept: (file, done) => {this.dropzoneFileNameNSS = file.name; this.file7 = true; done(); },
      autoReset: 1,
      errorReset: 1
    };
  }

  checkIfFilesCompleted() {
    if ( this.file1 && this.file2 && this.file3 && this.file3 && this.file4 && this.file5 && this.file6 && this.file7) {
      this.wizardService.changeStepTwoStatus(true);
    }
  }

  /*  DROPZONE 1 METHODS  */
  public resetDropzoneUploads(): void {
    this.componentRef.directiveRef.reset();
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    this.resetDropzoneUploads();
    if (args[1] === `You can't upload files of this type.`) {
      this.messagesService.warning('¡Error no se pueden subir archivos con esa extensión!');
    } else {
      this.messagesService.warning('¡Error no se pueden subir archivos tan pesados!');
    }
  }

  public onUploadSuccess(args: any): void {
    this.messagesService.success('Archivo cargado');

    this.checkIfFilesCompleted();
  }

  onDrop(event: DragEvent) {
    this.resetDropzoneUploads();
    console.log('dropped', event);
  }

  dropzoneClicked() {
    this.resetDropzoneUploads();
  }

}
