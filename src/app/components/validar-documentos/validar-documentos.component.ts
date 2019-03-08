import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatDialogConfig } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DetalleAlumnoService } from './../../services/detalle-alumno.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

const STATUS :  string[] = [ "Aceptado","Rechazado","En Revisión"];
const OBSERVACION : string[] = ['Documento correctamente','Documento pendiente',''];
const DOCS : string[] = ['CURP', 'CERTIFICADO','COMPROBANTE DE PAGO','CURP','ACTA NACIMIENTO']

@Component({
  selector: 'app-validar-documentos',
  templateUrl: './validar-documentos.component.html',
  styleUrls: ['./validar-documentos.component.css']
})



export class ValidarDocumentosComponent implements OnInit {
  alumnToValidate: string;


  displayedColumns: string[] = ['id','progress', 'color', 'name'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private detalleAlumnoService: DetalleAlumnoService) {
    // Create 100 users
    const users = Array.from({length: 6}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.detalleAlumnoService.currentRowCtrlNumber.subscribe(ctrnumber => this.alumnToValidate = ctrnumber);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onView() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    this.dialog.open(ValidarDocumentosModalComponent, dialogConfig);
  }

  onEdit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '90%';

    this.dialog.open(EditModalComponent, dialogConfig);
  }

}

const CURP = 'CURP';
/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';


  return {
    id: DOCS[Math.round(Math.random() * (DOCS.length))],
    name: name,
    progress: STATUS[Math.round(Math.random() * (STATUS.length - 1)).toString()],
    color: OBSERVACION[Math.round(Math.random() * (OBSERVACION.length - 1)).toString()]
  };
}


@Component({
  selector: 'app-validar-documentos-modal',
  templateUrl: './validar-documentos-modal.component.html',
  styleUrls: ['./validar-documentos-modal.component.css']
})

export class ValidarDocumentosModalComponent
 {
  src = "/src/assets/imgs/curp.pdf";
  nss = "/src/assets/imgs/NSS.pdf";


  constructor(public dialogRef: MatDialogRef<ValidarDocumentosModalComponent>){


  }

  closeDialog(){
    this.dialogRef.close(false);
  }

 }
