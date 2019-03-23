// Angular
import {Component, OnInit, ViewChild} from '@angular/core';
// Material
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// Components
import { EditModalComponent } from '../edit-modal/edit-modal.component';
// Services
import { DetalleAlumnoService } from './../../services/detalle-alumno.service';
import { AlumnoService } from './../../services/alumno.service';
import { ValidarDocumentosService } from './../../services/validar-documentos.service';

@Component({
  selector: 'app-validar-documentos',
  templateUrl: './validar-documentos.component.html',
  styleUrls: ['./validar-documentos.component.css']
})

export class ValidarDocumentosComponent implements OnInit {
  alumnToValidate: string;
  documentToAnalize: string;

  displayedColumns: string[] = ['documentName', 'status', 'observacion', 'actions'];
  dataSource: MatTableDataSource<Object>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  documentation: any;

  constructor(private alumnoService: AlumnoService, public dialog: MatDialog, private detalleAlumnoService: DetalleAlumnoService,
    private validarDocumentosService: ValidarDocumentosService) {

  }

  ngOnInit() {
    this.initServices();
  }

  async initServices() {
    await this.detalleAlumnoService.currentRowCtrlNumber.subscribe(ctrnumber => this.alumnToValidate = ctrnumber).unsubscribe();
    await this.validarDocumentosService.currentRowDocumentName.subscribe(docname => this.documentToAnalize = docname);
    await this.alumnoService.getAlumnoDocumentation(this.alumnToValidate).subscribe(res => {
      this.documentation = res as Object[];
      this.dataSource = new MatTableDataSource(this.documentation);
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

  onView(documentToVisualize) {
    this.validarDocumentosService.changeDocumentToUpdate(documentToVisualize);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    this.dialog.open(ValidarDocumentosModalComponent, dialogConfig);
  }

  onEdit(documentToValidate) {
    this.validarDocumentosService.changeDocumentToUpdate(documentToValidate);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(EditModalComponent, dialogConfig).afterClosed(
      ).subscribe(
        res => setTimeout( () => this.doRefreshTable(), 500)
      );
  }

  async doRefreshTable() {
    await this.alumnoService.getAlumnoDocumentation(this.alumnToValidate).subscribe(res => {
      this.documentation = res as Object[];
      this.dataSource = new MatTableDataSource(this.documentation);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}

@Component({
  selector: 'app-validar-documentos-modal',
  templateUrl: './validar-documentos-modal.component.html',
  styleUrls: ['./validar-documentos-modal.component.css']
})

export class ValidarDocumentosModalComponent {
  source: string;
  alumnToValidate: string;
  documentToAnalize: string;

  constructor(public dialogRef: MatDialogRef<ValidarDocumentosModalComponent>,
    private detalleAlumnoService: DetalleAlumnoService, private validarDocumentosService: ValidarDocumentosService) {
    this.initData();
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  async initData() {
    await this.detalleAlumnoService.currentRowCtrlNumber.subscribe(ctrnumber => this.alumnToValidate = ctrnumber).unsubscribe();
    await this.validarDocumentosService.currentRowDocumentName.subscribe(docname => this.documentToAnalize = docname);

    switch (this.documentToAnalize) {
      case('ACTA'): {
        this.source = `https://novaresidencia.000webhostapp.com/${this.alumnToValidate}/documentos/ACTA.pdf`;
        break;
      }
      case('CERTIFICADO'): {
        this.source = `https://novaresidencia.000webhostapp.com/${this.alumnToValidate}/documentos/CERTIFICADO.pdf`;
        break;
      }
      case('CLINICOS'): {
        this.source  = `https://novaresidencia.000webhostapp.com/${this.alumnToValidate}/documentos/CLINICOS.pdf`;
        break;
      }
      case('COMPROBANTE'): {
        this.source  = `https://novaresidencia.000webhostapp.com/${this.alumnToValidate}/documentos/COMPROBANTE.pdf`;
        break;
      }
      case('CURP'): {
        this.source  = `https://novaresidencia.000webhostapp.com/${this.alumnToValidate}/documentos/CURP.pdf`;
        break;
      }
      case('FOTO'): {
        this.source  = `https://novaresidencia.000webhostapp.com/${this.alumnToValidate}/documentos/FOTO.png`;
        break;
      }
      case('NSS'): {
        this.source  = `https://novaresidencia.000webhostapp.com/${this.alumnToValidate}/documentos/NSS.pdf`;
        break;
      }

    }
  }

}
