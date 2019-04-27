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
    acordeonFoto = 2;
    acordeonNSS = 1;
    acordeonCURP = 3;
    acordeonCertificado = 4;
    acordeonClinicos = 5;
    acordeonActa = 6;
    acordeonPago = 7;


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
    // Status of subdocuments from formulario alumno
    documentation: any;
    displayedColumns: string[] = ['documentName', 'status', 'observacion'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    // Values for document validation
    dataFormulario: any;
    status: string;
    observacionCertificado: string;
    observacionActa: string;
    observacionCurp: string;
    observacionComprobante: string;
    observacionClinicos: string;
    observacionNss: string;
    observacionFoto: string;
    observacionFormulario: string;

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

    constructor(
        public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
        private alumnoService: AlumnoService,
        private formularioRegistroService: FormularioRegistroService,
        private messagesService: MessagesService,
        private detalleAlumnoService: DetalleAlumnoService) {
        this.awaitForAlumnoData();
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

    awaitForValidationData() {
        this.alumnoService.getAlumnoDocumentation(this.selectedNoCtrl).subscribe(res => {
            this.documentation = res as Object[];
            this.dataSource = new MatTableDataSource(this.documentation);
            this.searchDocumentForAcordeonFOTO('FOTO');
            this.searchDocumentForAcordeonCURP('CURP');
            this.searchDocumentForAcordeonNSS('NSS');
            this.searchDocumentForAcordeonCERTIFICADO('CERTIFICADO');
            this.searchDocumentForAcordeonPAGO('COMPROBANTE');
            this.searchDocumentForAcordeonCLINICOS('CLINICOS');
            this.searchDocumentForAcordeonACTA('ACTA');
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    /*refreshTabContent
    */
    doRefreshTable() {
        this.alumnoService.getAlumnoDocumentation(this.selectedNoCtrl).subscribe(res => {
            this.documentation = res as Object[];
            this.dataSource = new MatTableDataSource(this.documentation);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    validateForm(documentToAnalize) {
        let comment;
        switch (documentToAnalize) {
            case 'ACTA': {
                comment = this.observacionActa;
                break;
            }
            case 'CERTIFICADO': {
                comment = this.observacionCertificado;
                break;
            }
            case 'COMPROBANTE': {
                comment = this.observacionComprobante;
                break;
            }
            case 'CURP': {
                comment = this.observacionCurp;
                break;
            }
            case 'NSS': {
                comment = this.observacionNss;
                break;
            }
            case 'CLINICOS': {
                comment = this.observacionClinicos;
                break;
            }
            case 'FOTO': {
                comment = this.observacionFoto;
                break;
            }
            case 'FORMULARIO': {
                comment = this.observacionFormulario;
                break;
            }
        }
        this.dataFormulario = {
            'documentName': documentToAnalize,
            'status': this.status,
            'observacion': comment
        };
        this.alumnoService.updateAlumnoDocumentationByCtrlNumber(this.selectedNoCtrl, this.dataFormulario).subscribe(res => {
            this.messagesService.success('¡Estatus de documento actualizado exitosamente!');
        });
    }

    refreshTabContent($event) {
        this.doRefreshTable();
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

    closeDialog(): void {
        this.dialogRef.close();
      }

}
