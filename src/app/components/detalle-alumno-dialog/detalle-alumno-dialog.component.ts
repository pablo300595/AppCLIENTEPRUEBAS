// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogRef } from '@angular/material';
// Components
// Custom Classes
import { CustomStringOperations } from '../../global-classes/custom-string-operations';
// Services
import { FormularioRegistroService } from './../../services/formulario-registro.service';
import { DetalleAlumnoService } from './../../services/detalle-alumno.service';
import { AlumnoService } from './../../services/alumno.service';
import { MessagesService } from './../../services/messages.service';
import { SecretariaMovementsService } from './../../services/secretaria-movements.service';
import { UsuarioService } from './../../services/usuario.service';
import { LoginService } from './../../services/login.service';
// Models
import { Alumno } from './../../models/alumno';

import {MatPaginatorIntl} from '@angular/material';

export interface StatusDocumento {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-detalle-alumno-dialog.component',
    templateUrl: './detalle-alumno-dialog.component.html',
    styleUrls: ['./detalle-alumno-dialog.component.css']
})

export class DetalleAlumnoDialogComponent extends MatPaginatorIntl{
    // Position of dataSource.data in order to deliver the status
    acordeonFoto = 2;
    acordeonNSS = 1;
    acordeonCURP = 3;
    acordeonCertificado = 4;
    acordeonClinicos = 5;
    acordeonActa = 6;
    acordeonPago = 7;
    acordeonFormulario = 0;
    // HTML inputs
    fieldLastNameFather: String = '';
    fieldLastNameMother: String = '';
    fieldFirstName: String = '';
    fieldControlNumber: String = '';
    fieldPlaceBirth: String = '';
    fieldDateBirth: String = '';
    fieldStatusCivil: String = '';
    fieldEmail: String = '';
    fieldCURP: String = '';
    fieldNSS: Number;
    fieldSex: String = '';
    fieldStreet: String = '';
    fieldColony: String = '';
    fieldCity: String = '';
    fieldState: String = '';
    fieldPostalCode: Number = 0;
    fieldPhone: Number = 0;
    fieldEtnia: String = '';
    fieldOtherEtnia: String = '';
    fieldDisability: String = '';
    fieldWhichDisability: String = '';
    fieldSchool: String = '';
    fieldOtherSchool: String = '';
    fieldNameSchool: String = '';
    fieldAverage: Number;
    fieldCareer: String = '';
    fieldDocuments: String[] = [];
    statusInscripcion: String;
    // Link document variables
    acta: string;
    certificado: string;
    clinicos: string;
    comprobante: string;
    curp: string;
    foto: string;
    nss: string;
    formulario: string; // NOT USED YET
    // Store alumnos' documentation
    documentation: any;
    // MatTable Variables
    displayedColumns: string[] = ['documentName', 'status', 'observacion'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    itemsPerPageLabel = 'Artículos por página:';
    nextPageLabel     = 'Siguiente página';
    previousPageLabel = 'Pagina anterior';
  
    getRangeLabel = function (page, pageSize, length) {
      if (length === 0 || pageSize === 0) {
        return '0 od ' + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
      return startIndex + 1 + ' - ' + endIndex + ' od ' + length;
    };


    // Values for document validation
    dataFormulario: any;
    status = 'En proceso';
    observacionCertificado = '';
    observacionActa = '';
    observacionCurp = '';
    observacionComprobante = '';
    observacionClinicos = '';
    observacionNss = '';
    observacionFoto = '';
    observacionFormulario = '';

    documentToAnalize: string;
    formularios: StatusDocumento[] = [
        { value: 'Aceptado', viewValue: 'Aceptado' },
        { value: 'En proceso', viewValue: 'En proceso' },
        { value: 'Rechazado', viewValue: 'Rechazado' }
    ];
    formulariosFull: StatusDocumento[] = [
        { value: 'Aceptado', viewValue: 'Aceptado' },
        { value: 'En proceso', viewValue: 'En proceso' },
        { value: 'Rechazado', viewValue: 'Rechazado' },
        { value: 'Validado', viewValue: 'Validado' }
    ];

    // Services variables
    alumno: any;
    selectedNoCtrl: String;
    firstTryGivenValues: boolean;
    currentUsername: String;
    currentUser: any;
    allDocumentStatus = ['', '', '', '', '', '', '', ''];
    allDocumentObservations = ['', '', '', '', '', '', '', ''];

    constructor(
        public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
        private alumnoService: AlumnoService,
        private formularioRegistroService: FormularioRegistroService,
        private messagesService: MessagesService,
        private detalleAlumnoService: DetalleAlumnoService,
        private secretariaMovementsService: SecretariaMovementsService,
        private usuarioService: UsuarioService,
        private loginService: LoginService) {

            super();

        this.awaitForAlumnoData();
    }

    /* CalledBy (Constructor)
    Initialize Service variables, maynly focuses on get all data from Alumno by NoCtrl*/
   async awaitForAlumnoData() {
    this.formularioRegistroService.changefirstTryGivenValues(false);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res);
    this.loginService.currentUser.subscribe(res => this.currentUsername = res);
    this.usuarioService.getUsuario(this.currentUsername).subscribe(res => this.currentUser = res);

    await this.alumnoService.getAlumno(this.selectedNoCtrl).subscribe(res => {
        this.alumno = res as Object;
        this.fieldAverage = this.alumno[0].average;
        this.fieldCareer = this.alumno[0].career;
        this.fieldCity = this.alumno[0].city;
        this.fieldColony = this.alumno[0].colony;
        this.fieldCURP = this.alumno[0].curp;
        this.fieldDateBirth = this.alumno[0].dateBirth,
        this.fieldDisability = this.alumno[0].disability;
        this.fieldEmail = this.alumno[0].email;
        this.fieldEtnia = this.alumno[0].etnia;
        this.fieldFirstName = this.alumno[0].firstName;
        this.fieldLastNameFather = this.alumno[0].lastNameFather;
        this.fieldLastNameMother = this.alumno[0].lastNameMother;
        this.fieldNameSchool = this.alumno[0].nameSchool;
        this.fieldNSS = this.alumno[0].nss;
        this.fieldOtherEtnia = this.alumno[0].otherEtnia;
        this.fieldOtherSchool = this.alumno[0].otherSchool;
        this.fieldPhone = this.alumno[0].phone;
        this.fieldPlaceBirth = this.alumno[0].placeBirth;
        this.fieldPostalCode = this.alumno[0].postalCode;
        this.fieldSchool = this.alumno[0].school;
        this.fieldSex = this.alumno[0].sex,
        this.fieldState = this.alumno[0].state;
        this.fieldStatusCivil = this.alumno[0].statusCivil;
        this.fieldStreet = this.alumno[0].street;
        this.fieldWhichDisability = this.alumno[0].whichDisability;

        this.acta = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/ACTA.pdf`;
        this.certificado = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/CERTIFICADO.pdf`;
        this.clinicos = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/CLINICOS.pdf`;
        this.comprobante = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/COMPROBANTE.pdf`;
        this.curp = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/CURP.pdf`;
        this.foto = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/FOTO.png`;
        this.nss = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/NSS.pdf`;
        this.formulario = `https://novaresidencia.000webhostapp.com/${this.alumno[0].controlNumber}/documentos/FORMULARIO.pdf`;
        this.awaitForValidationData();
        });
    }
    /* CalledBy (awaitForAlumnoData, checkIfAllDocumentsValidated)
    Method that makes a GET request to https://app-apipruebas.herokuapp.com/alumnos/documentation/:id
    then delivers all documentation into a global variable documentation. The object retrieved
    is used to generate information in allDocumentStatus and allDocumentObservations*/
    awaitForValidationData() {
        this.alumnoService.getAlumnoDocumentation(this.selectedNoCtrl).subscribe(res => {
            this.documentation = res as Object[];
            this.dataSource = new MatTableDataSource(this.documentation);
            this.adjustAccordionPosition();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.allDocumentStatus[0] = this.documentation[this.acordeonCertificado].status; // NEW
            this.allDocumentObservations[0] = this.documentation[this.acordeonCertificado].observacion; // NEW
            this.allDocumentStatus[1] = this.documentation[this.acordeonActa].status; // NEW
            this.allDocumentObservations[1] = this.documentation[this.acordeonActa].observacion; // NEW
            this.allDocumentStatus[2] = this.documentation[this.acordeonCURP].status; // NEW
            this.allDocumentObservations[2] = this.documentation[this.acordeonCURP].observacion; // NEW
            this.allDocumentStatus[3] = this.documentation[this.acordeonPago].status; // NEW
            this.allDocumentObservations[3] = this.documentation[this.acordeonPago].observacion; // NEW
            this.allDocumentStatus[4] = this.documentation[this.acordeonClinicos].status; // NEW
            this.allDocumentObservations[4] = this.documentation[this.acordeonClinicos].observacion; // NEW
            this.allDocumentStatus[5] = this.documentation[this.acordeonNSS].status; // NEW
            this.allDocumentObservations[5] = this.documentation[this.acordeonNSS].observacion; // NEW
            this.allDocumentStatus[6] = this.documentation[this.acordeonFoto].status; // NEW
            this.allDocumentObservations[6] = this.documentation[this.acordeonFoto].observacion; // NEW
            this.allDocumentStatus[7] = this.documentation[this.acordeonFormulario].status;
            this.allDocumentObservations[7] = this.documentation[this.acordeonFormulario].observacion; // NEW
        });
    }
    /*CalledBy(changing tab)
    Updates dataSource from the request getAlumnoDocumentation*/
    doRefreshTable() {
        this.alumnoService.getAlumnoDocumentation(this.selectedNoCtrl).subscribe(res => {
            this.documentation = res as Object[];
            this.dataSource = new MatTableDataSource(this.documentation);
            this.adjustAccordionPosition();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    /*CalledBy (awaitForValidationData, doRefreshTable)
    Call diferent methods that adjust the new position for each element for dataSource*/
    adjustAccordionPosition() {
        this.searchDocumentForAnyAcordeon('FOTO', 'Foto');
        this.searchDocumentForAnyAcordeon('CURP', 'CURP');
        this.searchDocumentForAnyAcordeon('NSS', 'NSS');
        this.searchDocumentForAnyAcordeon('CERTIFICADO', 'Certificado');
        this.searchDocumentForAnyAcordeon('COMPROBANTE', 'Pago');
        this.searchDocumentForAnyAcordeon('CLINICOS', 'Clinicos');
        this.searchDocumentForAnyAcordeon('ACTA', 'Acta');
        this.searchDocumentForAnyAcordeon('FORMULARIO', 'Formulario');
    }
    /*CalledBy (adjustAccordionPosition)
    Methods that returns the position of a dataSource element based on the document given by
    parameter*/
    searchDocumentForAnyAcordeon(document, accordion) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 8; i++) {
            if (dataSourceCopy[i].documentName === document) {
                if (accordion === 'Foto') {this.acordeonFoto = i; break; }
                if (accordion === 'CURP') {this.acordeonCURP = i; break; }
                if (accordion === 'NSS') {this.acordeonNSS = i; break; }
                if (accordion === 'Certificado') {this.acordeonCertificado = i; break; }
                if (accordion === 'Clinicos') {this.acordeonClinicos = i; break; }
                if (accordion === 'Acta') {this.acordeonActa = i; break; }
                if (accordion === 'Pago') {this.acordeonPago = i; break; }
                if (accordion === 'Formulario') {this.acordeonFormulario = i; break; }
            }
        }
    }
    /*CalledBy (Clicking button Guardar in first tab)
    Method that makes a PUT request to https://app-apipruebas.herokuapp.com/alumnos using an object
    built by most common global variables for each input*/
    updateAlumno() {
        this.alumno = {
            lastNameFather: this.fieldLastNameFather,
            lastNameMother: this.fieldLastNameMother,
            firstName: this.fieldFirstName,
            controlNumber: this.selectedNoCtrl,
            placeBirth: this.fieldPlaceBirth,
            dateBirth: CustomStringOperations.extractBirthFromCURP(this.fieldCURP.substring(4, 10)),
            statusCivil: this.fieldStatusCivil,
            email: this.fieldEmail,
            curp: this.fieldCURP,
            nss: this.fieldNSS,
            sex: this.fieldCURP.substring(10, 11),
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
            documents: [],
        };
        this.alumnoService.putAlumnoByCtrl(this.alumno, this.selectedNoCtrl).subscribe(
            res => {
                console.log('Se actualizó el alumno ya!!!');
                this.messagesService.success('¡Datos de alumno modificados con éxito!');
            }
        );
    }
    /*CalledBy (Clicking button Cancelar on modal window)
    Closes the modal window*/
    exit(): void {
        this.dialogRef.close();
    }
    /*CalledBy (Guardar Button in each accordeon item)
    Depending on the document passed by parameter is build an object that is composed by: documentName,
    status and observacion. The object values are given by the scoped variables comment and newstatus
    that uses the global arrays allDocumentObservations and allDocumentStatus. Finnally it
    makes a PUT request to https://app-apipruebas.herokuapp.com/alumnos/documentation/ctrl/:id
     */
    validateForm(documentToAnalize) {
        let comment;
        let newstatus;
        switch (documentToAnalize) {
            case 'ACTA': {
                comment = this.allDocumentObservations[1];
                newstatus = this.allDocumentStatus[1];
                break;
            }
            case 'CERTIFICADO': {
                comment = this.allDocumentObservations[0];
                newstatus = this.allDocumentStatus[0];
                break;
            }
            case 'COMPROBANTE': {
                comment = this.allDocumentObservations[3];
                newstatus = this.allDocumentStatus[3];
                break;
            }
            case 'CURP': {
                comment = this.allDocumentObservations[2];
                newstatus = this.allDocumentStatus[2];
                break;
            }
            case 'NSS': {
                comment = this.allDocumentObservations[5];
                newstatus = this.allDocumentStatus[5];
                break;
            }
            case 'CLINICOS': {
                comment = this.allDocumentObservations[4];
                newstatus = this.allDocumentStatus[4];
                break;
            }
            case 'FOTO': {
                comment = this.allDocumentObservations[6];
                newstatus = this.allDocumentStatus[6];
                break;
            }
            case 'FORMULARIO': {
                comment = this.allDocumentObservations[7];
                newstatus = this.allDocumentStatus[7];
                break;
            }
        }
        this.dataFormulario = {
            'documentName': documentToAnalize,
            'status': newstatus,
            'observacion': comment
        };
        const movement = {
            'usuario': this.currentUser[0]._id,
            'secretaria': this.currentUser[0].secretaria,
            'alumno': this.alumno[0]._id,
            'action': 'UPDATE',
            'document': documentToAnalize,
            'dateModificationServer': new Date(),
            'dateModificationClient': new Date(),
            'dataModified': `status: ${newstatus}, observacion: ${comment}`
        };
        this.secretariaMovementsService.registerSecretaryMovement(movement).subscribe();
        this.alumnoService.updateAlumnoDocumentationByCtrlNumber(this.selectedNoCtrl, this.dataFormulario).subscribe(res => {
            this.messagesService.success('¡Estatus de documento actualizado exitosamente!');
            this.checkIfAllDocumentsValidated();
        });
    }
    /*CalledBy (validateForm)
    Checks if all documents are validated*/
    checkIfAllDocumentsValidated() {
        setTimeout( () => {
            this.awaitForValidationData();
            setTimeout(() => {
                let validatedDocsQty = 0;
                for (let i = 0; i < this.documentation.length; i++) {
                    if (this.documentation[i].status === 'Validado') {
                        validatedDocsQty++;
                    }
                }
                if (validatedDocsQty === 8) {
                    console.log('Validados todos');
                    this.alumnoService.putStatusAlumnoByCtrl({statusInscripcion: 'Aceptado'}, this.selectedNoCtrl).subscribe(
                        res => this.messagesService.success('¡Todos los documentos han sido validados!')
                    );
                }
            }, 500);
        }, 500);
        console.log('hi');
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

}
