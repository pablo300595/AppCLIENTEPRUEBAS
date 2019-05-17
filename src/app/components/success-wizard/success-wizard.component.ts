import { Component, OnInit, ViewChild } from '@angular/core';
// Models
import { Alumno } from './../../models/alumno';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogRef } from '@angular/material';
// Services
import { AlumnoService } from './../../services/alumno.service';
import { UsuarioService } from './../../services/usuario.service';
import { LoginService } from './../../services/login.service';
import { MessagesService } from './../../services/messages.service';
import { CargaDocumentosService } from './../../services/carga-documentos.service';
// Dropzone
import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-success-wizard',
  templateUrl: './success-wizard.component.html',
  styleUrls: ['./success-wizard.component.css']
})
export class SuccessWizardComponent implements OnInit {
  // Variables for MatTable Content
  documentation: any;
  displayedColumns: string[] = ['documentName', 'status', 'observacion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // Service variables
  currentUser: any;
  // Dropzone conf
  public config: DropzoneConfigInterface;
  public config1: DropzoneConfigInterface;
  public config2: DropzoneConfigInterface;
  public config3: DropzoneConfigInterface;
  public config4: DropzoneConfigInterface;
  public config5: DropzoneConfigInterface;
  public config6: DropzoneConfigInterface;
  @ViewChild(DropzoneComponent) dropzoneComponent?: DropzoneComponent;
  dropzoneFileNameCERTIFICADO: any;
  dropzoneFileNameACTA: any;
  dropzoneFileNameCURP: any;
  dropzoneFileNameCOMPROBANTE: any;
  dropzoneFileNameANALISIS: any;
  dropzoneFileNamePhoto: any;
  dropzoneFileNameNSS: any;

  file1: boolean;
  file2: boolean;
  file3: boolean;
  file4: boolean;
  file5: boolean;
  file6: boolean;
  file7: boolean;

  // Download variables
  refCurp: any;
  refActa: any;
  refClinicos: any;
  refComprobante: any;
  refFoto: any;
  refNSS: any;
  refCertificado: any;
  srcFoto: any;
  // service
  currentAlumnoData: any;

  constructor(private alumnoService: AlumnoService, private usuarioService: UsuarioService,
    private loginService: LoginService, private cargaDocumentosService: CargaDocumentosService,
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe(res => this.currentUser = res);
    this.awaitForValidationData();
    this.config = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.currentUser, 'filename': 'CERTIFICADO.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameCERTIFICADO = file.name; this.file1 = true;
        this.cargaDocumentosService.changeFile1(true); done(); },
      autoReset: 1,
      errorReset: 1
    };
    this.config1 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.currentUser, 'filename': 'ACTA.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameACTA = file.name; this.file2 = true;
        this.cargaDocumentosService.changeFile2(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config2 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.currentUser, 'filename': 'CURP.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameCURP = file.name; this.file3 = true;
        this.cargaDocumentosService.changeFile3(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config3 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.currentUser, 'filename': 'COMPROBANTE.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameCOMPROBANTE = file.name; this.file4 = true;
        this.cargaDocumentosService.changeFile4(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config4 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.currentUser, 'filename': 'CLINICOS.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameANALISIS = file.name; this.file5 = true;
        this.cargaDocumentosService.changeFile5(true); done(); },
      autoReset: 1,
      errorReset: 1
    };

    this.config5 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.currentUser, 'filename': 'FOTO', 'isImage': true},
      accept: (file, done) => {this.dropzoneFileNamePhoto = file.name; this.file6 = true;
        this.cargaDocumentosService.changeFile6(true); done(); },
      autoReset: 1,
      errorReset: 1,
      acceptedFiles: '.png,.jpg'
    };

    this.config6 = {
      clickable: true, maxFiles: 2,
      params: {'usuario': this.currentUser, 'filename': 'NSS.pdf', 'isImage': false},
      accept: (file, done) => {this.dropzoneFileNameNSS = file.name; this.file7 = true;
        this.cargaDocumentosService.changeFile7(true); done(); },
      autoReset: 1,
      errorReset: 1
    };
  }

  awaitForValidationData() {
    this.alumnoService.getAlumnoByCtrl(this.currentUser).subscribe(res => {
      this.currentAlumnoData = res;
    });
    this.alumnoService.getAlumnoDocumentation(this.currentUser).subscribe(res => {
      this.documentation = res as Object[];
      this.dataSource = new MatTableDataSource(this.documentation);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadLink() {
    /*this.refFoto = document.getElementById('refFOTO');
    this.refFoto.src = `https://novaresidencia.000webhostapp.com/${this.currentUser}/documentos/FOTO.png`;
    */
    this.refCurp = document.getElementById('refCURP');
    this.refCurp.href = `https://novaresidencia.000webhostapp.com/${this.currentUser}/documentos/CURP.pdf`;

    this.refNSS = document.getElementById('refNSS');
    this.refNSS.href = `https://novaresidencia.000webhostapp.com/${this.currentUser}/documentos/NSS.pdf`;

    this.refActa = document.getElementById('refACTA');
    this.refActa.href = `https://novaresidencia.000webhostapp.com/${this.currentUser}/documentos/ACTA.pdf`;

    this.refClinicos = document.getElementById('refCLINICOS');
    this.refClinicos.href = `https://novaresidencia.000webhostapp.com/${this.currentUser}/documentos/CLINICOS.pdf`;

    this.refCertificado = document.getElementById('refCERTIFICADO');
    this.refCertificado.href = `https://novaresidencia.000webhostapp.com/${this.currentUser}/documentos/CERTIFICADO.pdf`;

    this.refComprobante = document.getElementById('refCOMPROBANTE');
    this.refComprobante.href = `https://novaresidencia.000webhostapp.com/${this.currentUser}/documentos/COMPROBANTE.pdf`;

  }

  public resetDropzoneUploads(): void {
    this.dropzoneComponent.directiveRef.reset();
  }

  public onUploadSuccess(args: any): void {
    this.messagesService.success('Archivo cargado');
  }
}
