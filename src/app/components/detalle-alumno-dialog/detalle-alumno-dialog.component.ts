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
// Models
import { Alumno } from './../../models/alumno';

export interface StatusDocumento {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-detalle-alumno-dialog.component',
    templateUrl: './detalle-alumno-dialog.component.html',
    styleUrls: ['./detalle-alumno-dialog.component.css']
})

export class DetalleAlumnoDialogComponent {
    // Position of dataSource.data in order to retrieve status
    acordeonFoto = 2;
    acordeonNSS = 1;
    acordeonCURP = 3;
    acordeonCertificado = 4;
    acordeonClinicos = 5;
    acordeonActa = 6;
    acordeonPago = 7;
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

    // Services variables
    alumno: Alumno;
    selectedNoCtrl: String;
    firstTryGivenValues: boolean;
    allDocumentStatus = ['', '', '', '', '', '', '', ''];
    allDocumentObservations = ['', '', '', '', '', '', '', ''];

    constructor(
        public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
        private alumnoService: AlumnoService,
        private formularioRegistroService: FormularioRegistroService,
        private messagesService: MessagesService,
        private detalleAlumnoService: DetalleAlumnoService) {
        this.awaitForAlumnoData();
    }

    /* CalledBy (Constructor)
    Initialize Service variables
    */
   async awaitForAlumnoData() {
    this.formularioRegistroService.changefirstTryGivenValues(false);
    this.formularioRegistroService.currentfirstTryGivenValues.subscribe(value => this.firstTryGivenValues = value);
    this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res);

    await this.alumnoService.getAlumno(this.selectedNoCtrl).subscribe(res => {
        this.alumno = res as Alumno;
        this.fieldAverage = this.alumno.average;
        this.fieldCareer = this.alumno.career;
        this.fieldCity = this.alumno.city;
        this.fieldColony = this.alumno.colony;
        this.fieldCURP = this.alumno.curp;
        this.fieldDateBirth = this.alumno.dateBirth,
        this.fieldDisability = this.alumno.disability;
        this.fieldEmail = this.alumno.email;
        this.fieldEtnia = this.alumno.etnia;
        this.fieldFirstName = this.alumno.firstName;
        this.fieldLastNameFather = this.alumno.lastNameFather;
        this.fieldLastNameMother = this.alumno.lastNameMother;
        this.fieldNameSchool = this.alumno.nameSchool;
        this.fieldNSS = this.alumno.nss;
        this.fieldOtherEtnia = this.alumno.otherEtnia;
        this.fieldOtherSchool = this.alumno.otherSchool;
        this.fieldPhone = this.alumno.phone;
        this.fieldPlaceBirth = this.alumno.placeBirth;
        this.fieldPostalCode = this.alumno.postalCode;
        this.fieldSchool = this.alumno.school;
        this.fieldSex = this.alumno.sex,
        this.fieldState = this.alumno.state;
        this.fieldStatusCivil = this.alumno.statusCivil;
        this.fieldStreet = this.alumno.street;
        this.fieldWhichDisability = this.alumno.whichDisability;
        console.log(this.alumno);

        this.acta = `https://novaresidencia.000webhostapp.com/${this.alumno.controlNumber}/documentos/ACTA.pdf`;
        this.certificado = `https://novaresidencia.000webhostapp.com/${this.alumno.controlNumber}/documentos/CERTIFICADO.pdf`;
        this.clinicos = `https://novaresidencia.000webhostapp.com/${this.alumno.controlNumber}/documentos/CLINICOS.pdf`;
        this.comprobante = `https://novaresidencia.000webhostapp.com/${this.alumno.controlNumber}/documentos/COMPROBANTE.pdf`;
        this.curp = `https://novaresidencia.000webhostapp.com/${this.alumno.controlNumber}/documentos/CURP.pdf`;
        this.foto = `https://novaresidencia.000webhostapp.com/${this.alumno.controlNumber}/documentos/FOTO.png`;
        this.nss = `https://novaresidencia.000webhostapp.com/${this.alumno.controlNumber}/documentos/NSS.pdf`;

        this.awaitForValidationData();
        });
    }
    /* CalledBy (awaitForAlumnoData)

    */
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
            // this.allDocumentStatus[7] = this.documentation[this.acordeonFormulario].status;
            // this.allDocumentObservations[7] = this.documentation[this.acordeonFormulario].observacion; // NEW
        });
    }
    /*CalledBy (awaitForValidationData, doRefreshTable)
    */
    adjustAccordionPosition() {
        this.searchDocumentForAcordeonFOTO('FOTO');
        this.searchDocumentForAcordeonCURP('CURP');
        this.searchDocumentForAcordeonNSS('NSS');
        this.searchDocumentForAcordeonCERTIFICADO('CERTIFICADO');
        this.searchDocumentForAcordeonPAGO('COMPROBANTE');
        this.searchDocumentForAcordeonCLINICOS('CLINICOS');
        this.searchDocumentForAcordeonACTA('ACTA');
        // this.searchDocumentForAcordeonACTA('FORMULARIO');
    }

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

    exit(): void {
        this.dialogRef.close();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    refreshTabContent($event) {
        this.doRefreshTable();
    }
    /*CalledBy(refreshTabContent)
    */
    doRefreshTable() {
        this.alumnoService.getAlumnoDocumentation(this.selectedNoCtrl).subscribe(res => {
            this.documentation = res as Object[];
            this.dataSource = new MatTableDataSource(this.documentation);
            this.adjustAccordionPosition();
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
    /*CalledBy (Guardar Button in each accordeon item)
    Depending on the document passed by parameter is build an object that is
    composed by: documentName, status and observacion. The object values are given by
    the scoped variables comment and newstatus that uses the global arrays
    allDocumentObservations and allDocumentStatus.
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
        this.alumnoService.updateAlumnoDocumentationByCtrlNumber(this.selectedNoCtrl, this.dataFormulario).subscribe(res => {
            this.messagesService.success('¡Estatus de documento actualizado exitosamente!');
        });
    }

    searchDocumentForAcordeonFOTO(document) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 7; i++) {
            if (dataSourceCopy[i].documentName === document) {
                this.acordeonFoto = i;
                break;
            }
        }
    }

    searchDocumentForAcordeonCURP(document) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 7; i++) {
            if (dataSourceCopy[i].documentName === document) {
                this.acordeonCURP = i;
                break;
            }
        }
    }

    searchDocumentForAcordeonNSS(document) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 7; i++) {
            if (dataSourceCopy[i].documentName === document) {
                this.acordeonNSS = i;
                break;
            }
        }
    }

    searchDocumentForAcordeonCERTIFICADO(document) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 7; i++) {
            if (dataSourceCopy[i].documentName === document) {
                this.acordeonCertificado = i;
                break;
            }
        }
    }

    searchDocumentForAcordeonCLINICOS(document) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 7; i++) {
            if (dataSourceCopy[i].documentName === document) {
                this.acordeonClinicos = i;
                break;
            }
        }
    }

    searchDocumentForAcordeonACTA(document) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 7; i++) {
            if (dataSourceCopy[i].documentName === document) {
                this.acordeonActa = i;
                break;
            }
        }
    }

    searchDocumentForAcordeonPAGO(document) {
        let dataSourceCopy: any;
        dataSourceCopy = this.dataSource.data;
        for (let i = 0; i < 7; i++) {
            if (dataSourceCopy[i].documentName === document) {
                this.acordeonPago = i;
                break;
            }
        }
    }

}
