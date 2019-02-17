import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { MessagesService } from './../../services/messages.service';
import { WizardService } from './../../services/wizard.service';
import { CargaDocumentosService } from './../../services/carga-documentos.service';

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

  dropzoneFilePhotoNewNameExtension: any;

  constructor(private loginService: LoginService, private wizardService: WizardService,
    private messagesService: MessagesService, private cargaDocumentosService: CargaDocumentosService) {
    this.stepTwoCompleted = false;
  }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.loginService.currentUser.subscribe(user => this.userLoged = user);

    this.wizardService.currentStepTwo.subscribe(status => this.stepTwoCompleted = status);

    this.cargaDocumentosService.currentalumnoFile1.subscribe(status => this.file1 = status);
    this.cargaDocumentosService.currentalumnoFile2.subscribe(status => this.file2 = status);
    this.cargaDocumentosService.currentalumnoFile3.subscribe(status => this.file3 = status);
    this.cargaDocumentosService.currentalumnoFile4.subscribe(status => this.file4 = status);
    this.cargaDocumentosService.currentalumnoFile5.subscribe(status => this.file5 = status);
    this.cargaDocumentosService.currentalumnoFile6.subscribe(status => this.file6 = status);
    this.cargaDocumentosService.currentalumnoFile7.subscribe(status => this.file7 = status);

    this.cargaDocumentosService.currentFile1String.subscribe(status => this.dropzoneFileNameCERTIFICADO = status);
    this.cargaDocumentosService.currentFile2String.subscribe(status => this.dropzoneFileNameACTA = status);
    this.cargaDocumentosService.currentFile3String.subscribe(status => this.dropzoneFileNameCURP = status);
    this.cargaDocumentosService.currentFile4String.subscribe(status => this.dropzoneFileNameCOMPROBANTE = status);
    this.cargaDocumentosService.currentFile5String.subscribe(status => this.dropzoneFileNameANALISIS = status);
    this.cargaDocumentosService.currentFile6String.subscribe(status => this.dropzoneFileNamePhoto = status);
    this.cargaDocumentosService.currentFile7String.subscribe(status => this.dropzoneFileNameNSS = status);
    /*Dropzone*/
    this.config = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'CERTIFICADO.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameCERTIFICADO = file.name; this.file1 = true;
        this.cargaDocumentosService.changeFile1(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config1 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'ACTA.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameACTA = file.name; this.file2 = true;
        this.cargaDocumentosService.changeFile2(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config2 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'CURP.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameCURP = file.name; this.file3 = true;
        this.cargaDocumentosService.changeFile3(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config3 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'COMPROBANTE.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameCOMPROBANTE = file.name; this.file4 = true;
        this.cargaDocumentosService.changeFile4(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config4 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'CLINICOS.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameANALISIS = file.name; this.file5 = true;
        this.cargaDocumentosService.changeFile5(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config5 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'FOTO', 'isImage': true},
      accept: (file, done) => {this.dropzoneFileNamePhoto = file.name; this.file6 = true;
        this.cargaDocumentosService.changeFile6(true); done(); },
      autoReset: 1,
      errorReset: 1,
      acceptedFiles: '.png,.jpg'
    };

    this.config6 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.userLoged, 'filename': 'NSS.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameNSS = file.name; this.file7 = true;
        this.cargaDocumentosService.changeFile7(true); done(); },
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

  }

  public onDragEnd(args: any): void {

  }

  /*public onUploadError(args: any): void {
    this.resetDropzoneUploads();
    if (args[1] === `You can't upload files of this type.`) {
      if (this.EDITINGPHOTO) {
        this.messagesService.warning(`¡Error no se pueden subir archivos con esa extensión!\n
        Las extensiones permitidas son .png y .jpeg`);
        this.EDITINGPHOTO = false;
      } else {
        this.messagesService.warning(`¡Error no se pueden subir archivos con esa extensión!\n
        Las extensiones permitidas son .pdf`);
      }
    } else {
      this.messagesService.warning('¡Error no se pueden subir archivos tan pesados!\nEl límite es 3MB');
    }
  }*/

  public onUploadSuccess(args: any): void {
    this.messagesService.success('Archivo cargado');
    this.dropzoneFilePhotoNewNameExtension = 'FOTO.' + this.dropzoneFileNamePhoto.substring(this.dropzoneFileNamePhoto.length - 3);
    this.checkIfFilesCompleted();
  }

  onDrop(event: DragEvent) {
    this.resetDropzoneUploads();
  }

  onError(args: any) {
    if (args[1] === `You can't upload files of this type.`) {
      this.messagesService.warning(`¡Error no se pueden subir archivos con esa extensión!\n
      Las extensiones permitidas son .png y .jpeg`);
    } else {
      this.messagesService.warning('¡Error no se pueden subir archivos tan pesados!\nEl límite es 3MB');
    }
  }

  onErrorCommon(args: any) {
    this.resetDropzoneUploads();
    if (args[1] === `You can't upload files of this type.`) {
      this.messagesService.warning(`¡Error no se pueden subir archivos con esa extensión!\n
      Las extensiones permitidas son .pdf`);
    } else {
      this.messagesService.warning('¡Error no se pueden subir archivos tan pesados!\nEl límite es 3MB');
    }
  }

  dropzoneClicked() {
    this.resetDropzoneUploads();
  }

  resetFiles() {
    this.file1 = this.file2 = this.file3 = this.file4 = this.file5 = this.file6 = this.file7 = false;
  }

}
