import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// Services
import { ValidarDocumentosService } from './../../services/validar-documentos.service';
import { AlumnoService } from './../../services/alumno.service';
import { DetalleAlumnoService } from './../../services/detalle-alumno.service';
import { MessagesService } from './../../services/messages.service';

export interface StatusDocumento {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})

export class EditModalComponent implements OnInit {
  documentToAnalize: string;
  selectedNoCtrl: string;
  dataFormulario: any;
  status: string;
  observacion: string;
  constructor(public dialogRef: MatDialogRef<EditModalComponent>, private validarDocumentosService: ValidarDocumentosService,
    private alumnoService: AlumnoService, private detalleAlumnoService: DetalleAlumnoService,
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.initServices();
  }

  async initServices() {
    await this.validarDocumentosService.currentRowDocumentName.subscribe(docname => this.documentToAnalize = docname);
    await this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res);
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  // tslint:disable-next-line:member-ordering
  formularios: StatusDocumento[] = [
    {value: 'Aceptado', viewValue: 'Aceptado'},
    {value: 'En proceso', viewValue: 'En proceso'},
    {value: 'Rechazado', viewValue: 'Rechazado'}
  ];

  async validateForm() {
    this.dataFormulario = {
      'documentName': this.documentToAnalize,
      'status': this.status,
      'observacion': this.observacion
    };
    this.alumnoService.updateAlumnoDocumentationByCtrlNumber(this.selectedNoCtrl, this.dataFormulario).subscribe(res => {
      this.closeDialog();
      this.messagesService.success('¡Estatus de documento actualizado exitosamente!');
    });
  }

  exit(): void {
    this.dialogRef.close();
  }

}
