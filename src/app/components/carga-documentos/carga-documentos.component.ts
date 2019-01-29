import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { MessagesService } from './../../services/messages.service';
import { WizardService } from './../../services/wizard.service';
import { DropzoneTemplatesService } from './../../services/dropzone-templates.service';
import { Archivo } from './../../models/archivo';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

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
  archivoAlumno: Archivo;

  fileOK: boolean;
  file1: boolean;
  file2: boolean;
  file3: boolean;
  file4: boolean;
  file5: boolean;
  stepTwoCompleted: boolean;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'sampleFile'});
  public uploaderBirthCertificate: FileUploader = new FileUploader({url: URL, itemAlias: 'sampleFile'});
  public uploaderBirthCURP: FileUploader = new FileUploader({url: URL, itemAlias: 'sampleFile'});
  public uploaderProofCopy: FileUploader = new FileUploader({url: URL, itemAlias: 'sampleFile'});
  public uploaderClinicAnalysis: FileUploader = new FileUploader({url: URL, itemAlias: 'sampleFile'});

  /* Dropzone conf */
  public type = 'component';
  public disabled = false;
  public config: DropzoneConfigInterface;
  @ViewChild(DropzoneComponent) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

  filePhotoIsUploaded: boolean;
  dropzoneFileName: any;

  constructor(private loginService: LoginService, private wizardService: WizardService,
    private messagesService: MessagesService, private dropzoneTemplatesService: DropzoneTemplatesService) {
    this.fileOK = false;
    this.stepTwoCompleted = false;
    /* Dropzone */
    this.filePhotoIsUploaded = false;
  }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
    this.loginService.currentUser.subscribe(user => this.userLoged = user);

    this.wizardService.currentStepTwo.subscribe(status => this.stepTwoCompleted = status);
    /*
      school uploader
    */
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      // check status
      if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Invalid format') {
        this.messagesService.warning('Formato de archivo no válido solo se acepta pdf!');
        this.fileOK = false;
        return;
      } else if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Too Big') {
        this.messagesService.warning('Archivo muy pesado el límite es 1 MB!');
        this.fileOK = false;
        return;
      } else {
        this.fileOK = true;
        this.file1 = true;
        this.checkIfFilesCompleted();
        this.messagesService.success('Archivo cargado con exito!!!');
      }
    };
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('usuario' , this.userLoged);
      form.append('filename' , 'certificadoPrepa.pdf');
     };
    this.uploader.uploadAll();
     /*
      birth certificate uploader
    */
    this.uploaderBirthCertificate.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderBirthCertificate.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      // check status
      if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Invalid format') {
        this.messagesService.warning('Formato de archivo no válido solo se acepta pdf!');
        this.fileOK = false;
        return;
      } else if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Too Big') {
        this.messagesService.warning('Archivo muy pesado el límite es 1 MB!');
        this.fileOK = false;
        return;
      } else {
        this.fileOK = true;
        this.file2 = true;
        this.checkIfFilesCompleted();
        this.messagesService.success('Archivo cargado con exito!!!');
      }
    };
    this.uploaderBirthCertificate.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('usuario' , this.userLoged);
      form.append('filename' , 'certificadoNacimiento.pdf');
     };
    this.uploaderBirthCertificate.uploadAll();
    /*
      CURP uploader
    */
   this.uploaderBirthCURP.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderBirthCURP.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      // check status
      if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Invalid format') {
        this.messagesService.warning('Formato de archivo no válido solo se acepta pdf!');
        this.fileOK = false;
        return;
      } else if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Too Big') {
        this.messagesService.warning('Archivo muy pesado el límite es 1 MB!');
        this.fileOK = false;
        return;
      } else {
        this.fileOK = true;
        this.file3 = true;
        this.checkIfFilesCompleted();
        this.messagesService.success('Archivo cargado con exito!!!');
      }
    };
    this.uploaderBirthCURP.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('usuario' , this.userLoged);
      form.append('filename' , 'CURP.pdf');
     };
    this.uploaderBirthCURP.uploadAll();
    /*
      Proof Copy uploader
    */
   this.uploaderProofCopy.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderProofCopy.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      // check status
      if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Invalid format') {
        this.messagesService.warning('Formato de archivo no válido solo se acepta pdf!');
        this.fileOK = false;
        return;
      } else if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Too Big') {
        this.messagesService.warning('Archivo muy pesado el límite es 1 MB!');
        this.fileOK = false;
        return;
      } else {
        this.fileOK = true;
        this.file4 = true;
        this.checkIfFilesCompleted();
        this.messagesService.success('Archivo cargado con exito!!!');
      }
    };
    this.uploaderProofCopy.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('usuario' , this.userLoged);
      form.append('filename' , 'comprobantePago.pdf');
     };
    this.uploaderProofCopy.uploadAll();
    /*
      Clinic uploader
    */
   this.uploaderClinicAnalysis.onAfterAddingFile = (file) => { file.withCredentials = false; };
   this.uploaderClinicAnalysis.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
     console.log('ImageUpload:uploaded:', item, status, response);
     // check status
     if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Invalid format') {
      this.messagesService.warning('Formato de archivo no válido solo se acepta pdf!');
       this.fileOK = false;
       return;
     } else if ((response.substring((response.indexOf('/') + 1), (response.indexOf('$')))) === 'Too Big') {
      this.messagesService.warning('Archivo muy pesado el límite es 1 MB!');
       this.fileOK = false;
       return;
     } else {
       this.fileOK = true;
       this.file5 = true;
       this.checkIfFilesCompleted();
       this.messagesService.success('Archivo cargado con exito!!!');
     }
   };
   this.uploaderClinicAnalysis.onBuildItemForm = (fileItem: any, form: any) => {
     form.append('usuario' , this.userLoged);
     form.append('filename' , 'analsisClinicos.pdf');
    };
   this.uploaderClinicAnalysis.uploadAll();

    if (this.fileOK === true) {
      alert('Archivo cargado exitosamente!');
    }

    /*Dropzone*/
    this.config = {
      clickable: true,
      maxFiles: 2,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      params: {
        'usuario': this.userLoged,
        'filename': 'documento.pdf'
      },
      accept: (file, done) => {
        // this.directiveRef.reset();
        console.log('ARCHIVO SUBIDO FIERRO!!');
        done();
      },
      previewTemplate: this.dropzoneTemplatesService.templatePDF
    };
  }

  checkIfFilesCompleted() {
    if ( this.file1 && this.file2 && this.file3 && this.file3 && this.file4) {
      this.wizardService.changeStepTwoStatus(true);
    }
  }

  /*  DROPZONE METHODS  */

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }

  public onUploadError(args: any): void {
    this.resetDropzoneUploads();
    this.messagesService.warning('¡Error no se pueden subir archivos con esa extensión!');
  }

  public onUploadSuccess(args: any): void {
    this.dropzoneFileName = this.componentRef.directiveRef.dropzone().files[0].name;
    this.messagesService.success('Archivo cargado');
  }

  onDrop(event: DragEvent) {
    this.resetDropzoneUploads();
    console.log('dropped', event);
  }

  dropzoneClicked() {
    this.resetDropzoneUploads();
    this.dropzoneFileName = '';
  }

}
