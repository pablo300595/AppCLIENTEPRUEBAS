import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from './../../services/file.service';
import { LoginService } from './../../services/login.service';
import { MessagesService } from './../../services/messages.service';
import { Archivo } from './../../models/archivo';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { WizardService } from './../../services/wizard.service';
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

  constructor(private fileService: FileService, private loginService: LoginService, private wizardService: WizardService,
    private messagesService: MessagesService) {
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
      previewTemplate: `<div id="dropzonePreview"  style="text-align:center;">
      <svg enable-background="new 0 0 1024 1024" height="80px"
      id="Layer_1" version="1.1" viewBox="0 0 1024 1024" width="80px"
      xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"><g><g>
      <path d="M146.901,249.004V964c0,33,27,60,60,60h613.857c33,
      0,60-27,60-60V60c0-33-27-60-60-60H395.906" fill="#E74C3C"/><g>
      <path d="M146.901,249.004h189.005c33,0,60-27,60-60V0"
      fill="#C0392B"/></g></g></g><g><path d="M81.83,670.833h65.071V585l-70.946,
      88.375h0.012C77.167,671.805,79.198,670.833,81.83,670.833z" fill="#262626"/>
      <path d="M945.83,670.833h-65.071V585l70.946,88.375h-0.012C950.493,671.805,948.462,670.833,945.83,670.833z"
      fill="#262626"/><path d="M884.273,861.471c-1.934,5.149-8.015,9.362-13.515,9.362H156.901c-5.5,0-11.582-4.213-13.514-9.362
      L75.344,680.195c-1.933-5.149,0.986-9.362,6.486-9.362h864c5.5,0,8.419,4.213,6.486,9.362L884.273,861.471z" fill="#C0392B"/></g><g>
      <path d="M335.251,818.323c0-5.013,1.484-8.881,4.454-11.606c2.97-2.724,7.287-4.087,12.955-4.087
      c5.395,0,9.535,1.363,12.424,4.087c2.888,2.726,4.332,6.594,4.332,11.606c0,4.903-1.485,8.732-4.455,11.483
      c-2.971,2.751-7.069,4.127-12.301,4.127c-5.395,0-9.645-1.362-12.75-4.086C336.804,827.123,335.251,823.282,335.251,818.323z"
      fill="#FFFFFF"/><path d="M476.241,750.402c0,13.351-3.938,23.662-11.811,30.937c-7.874,7.273-19.058,10.911-33.552,10.911h-9.072
      v39.641h-32.284V712.396h41.356c15.093,0,26.427,3.297,34.001,9.89C472.453,728.88,476.241,738.252,476.241,750.402z
      M421.807,765.932h5.885c4.85,0,8.705-1.361,11.565-4.087c2.86-2.724,4.291-6.483,4.291-11.279c0-8.063-4.469-12.097-
      13.404-12.097   h-8.337V765.932z" fill="#FFFFFF"/><path d="M596.716,769.609c0,19.943-5.488,35.31-16.469,46.098c
      -10.98,10.789-26.414,16.184-46.302,16.184h-38.66   V712.396h41.357c19.179,0,33.987,4.903,44.423,14.712C591.499,736.916,
      596.716,751.084,596.716,769.609z M563.206,770.754   c0-10.952-2.166-19.07-6.498-24.356c-4.332-5.285-10.912-7.929-19.738-7.929h
      -9.399v66.94h7.192c9.809,0,17-2.847,21.578-8.541   C560.917,791.175,563.206,782.47,563.206,770.754z" fill="#FFFFFF"/>
      <path d="M649.925,831.891h-31.793V712.396h70.617v25.909h-38.824v22.804h35.801v25.909h-35.801V831.891z" fill="#FFFFFF"/>
      </g><g><g><path d="M729.983,369.821c0,8.25-9,15-20,15H314.852c-11,0-20-6.75-20-15s9-15,20-15h395.132
      C720.983,354.821,729.983,361.571,729.983,369.821z" fill="#FFFFFF"/></g><g><path d="M729.148,459.821c0,8.25-9,15-20,
      15H314.017c-11,0-20-6.75-20-15s9-15,20-15h395.132    C720.148,444.821,729.148,451.571,729.148,459.821z" fill="#FFFFFF"/></g><g>
      <path d="M729.983,550.016c0,8.25-9,15-20,15H314.852c-11,0-20-6.75-20-15s9-15,20-15h395.132
      C720.983,535.016,729.983,541.766,729.983,550.016z" fill="#FFFFFF"/></g></g></svg>
      <hr><p><b>Nombre nuevo: <b>documento.pdf<p><hr></div>`
    };
  }

  checkIfFilesCompleted() {
    if ( this.file1 && this.file2 && this.file3 && this.file3 && this.file4) {
      this.wizardService.changeStepTwoStatus(true);
    }
  }

  /*  DROPZONE METHODS  */
  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload(): void {
    this.config.maxFiles = this.config.maxFiles ? 0 : 1;
  }

  public toggleClickAction(): void {
    this.config.clickable = !this.config.clickable;
  }

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
    console.log('onUploadError:', args);
    this.resetDropzoneUploads();
    this.messagesService.warning('¡Error no se pueden subir archivos con esa extensión!');
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    this.dropzoneFileName = this.componentRef.directiveRef.dropzone().files[0].name;
    this.messagesService.success('Archivo cargado');
  }

  removeFiles() {
    this.componentRef.directiveRef.dropzone().files.pop();
  }

  resetDropzone() {
    this.directiveRef.reset();
    this.componentRef.directiveRef.reset();
  }

  onDrop(event: DragEvent) {
    // this.resetDropzone();
    this.resetDropzoneUploads();
    console.log('dropped', event);
  }

  changeTemplate() {
    this.directiveRef.dropzone().config.previewTemplate = '<h1> Hola <h1>';
  }

  dropzoneClicked() {
    this.resetDropzoneUploads();
    this.dropzoneFileName = '';
  }

}
