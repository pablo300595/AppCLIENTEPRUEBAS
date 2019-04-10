// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
// Components
import { DetalleAlumnoDialogComponent } from '../detalle-alumno-dialog/detalle-alumno-dialog.component';
// Services
import { DetalleAlumnoService } from './../../services/detalle-alumno.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AlumnoService } from './../../services/alumno.service';
import { UsuarioService } from './../../services/usuario.service';
import { LoginService } from './../../services/login.service';
// Models
import { Alumno } from './../../models/alumno';

@Component({
  selector: 'app-detalle-alumno',
  templateUrl: './detalle-alumno.component.html',
  styleUrls: ['./detalle-alumno.component.css']
})

export class DetalleAlumnoComponent implements OnInit {
  displayedColumns: string[] = ['controlNumber', 'lastNameFather', 'lastNameMother', 'firstName', 'career', 'statusInscripcion', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Filters
  filterA: any;
  filterB: any;
  filterC: any;
  filterD: any;

  alumno: Alumno;
  alumnos: any;

  selectedNoCtrl: string;
  currentUser: string; // Stores JUST the username
  currentUserToLoadCareer: any; // Stores WHOLE current user data

  // Mecanisms
  careerVisualizationMode: boolean;

  constructor(private alumnoService: AlumnoService, public dialog: MatDialog, private detalleAlumnoService: DetalleAlumnoService,
    private dialogService: DialogService, private notificationService: NotificationService,
    private usuarioService: UsuarioService, private loginService: LoginService) {

    this.filterA = { 'value': false, 'filter': 'En captura' };
    this.filterB = { 'value': false, 'filter': 'Enviado' };
    this.filterC = { 'value': false, 'filter': 'Validado' };
    this.filterD = { 'value': false, 'filter': 'Aceptado' };

    this.careerVisualizationMode = false;
  }

  ngOnInit() {
    // this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res); // Gets control number of selected row
    this.loginService.currentUser.subscribe(res => this.currentUser = res); // Gets current username loged
    this.usuarioService.getUsuario(this.currentUser).subscribe(res => this.currentUserToLoadCareer = res);

    setTimeout(() => {
      this.getUsuarioData(this.currentUserToLoadCareer);
    }, 500);
  }
  /* CalledBy(ngOnInit)
    Method that uses the object brought by the parameter (ex: {_id:"123456",active:false,career:Array,
    credential:'secretary',user:'secreA',pass:'1234'}).
    Then it makes a POST request to https://app-apipruebas.herokuapp.com/alumnos/career
    where an array composed by Students and its documents is retrieved. Finally Global values are updated with this
  */
  getUsuarioData(careers) {
    console.log('DATA');
    this.alumnoService.getAlumnosByCareer(careers)
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);

        this.dataSource = new MatTableDataSource(this.alumnos);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  refreshTableAlumnosData() {
    this.alumnoService.getAlumnosByCareer(this.currentUserToLoadCareer)
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);

        this.dataSource = new MatTableDataSource(this.alumnos);

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

  applyFilterOfCheck(filterValue) {
    if (!this.filterA.value) { this.filterA.filter = ''; }
    if (!this.filterB.value) { this.filterB.filter = ''; }
    if (!this.filterC.value) { this.filterC.filter = ''; }
    if (!this.filterD.value) { this.filterD.filter = ''; }

    this.dataSource.filterPredicate = ((data: any, filter: string) => {
      return this.customPredicateEvaluation(data);
    });

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filterA.filter = 'En captura';
    this.filterB.filter = 'Enviado';
    this.filterC.filter = 'Validado';
    this.filterD.filter = 'Aceptado';
  }

  customPredicateEvaluation(data) {
    console.log(data.statusInscripcion);
    const result = (data.statusInscripcion === this.filterA.filter) ||
      (data.statusInscripcion === this.filterB.filter) ||
      (data.statusInscripcion === this.filterC.filter) ||
      (data.statusInscripcion === this.filterD.filter);
    return result;
  }

  onChange(event) {
    if (event.source.id === 'ck-EnCaptura') { this.filterA.value = event.checked; }
    if (event.source.id === 'ck-Enviado') { this.filterB.value = event.checked; }
    if (event.source.id === 'ck-Validado') { this.filterC.value = event.checked; }
    if (event.source.id === 'ck-Aceptado') { this.filterD.value = event.checked; }

    this.applyFilterOfCheck(event);
  }

  onChangeVisualMode() {
    this.doRefreshTable();
  }

  getAlumnos() {
    this.alumnoService.getAlumnos()
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);
      });
  }

  async preUpdate(ctrlNumber) {
    console.log('DETALLE NUMERO DE CONTROL: ' + ctrlNumber);
    this.detalleAlumnoService.changeAlumnoToUpdate(ctrlNumber);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DetalleAlumnoDialogComponent, dialogConfig).afterClosed().subscribe(
      res => setTimeout(() => this.doRefreshTable(), 500)
    );
  }

  doRefreshTable() {
    if (!this.careerVisualizationMode) {
      this.getUsuarioData(this.currentUserToLoadCareer);
    } else {
      this.alumnoService.getAlumnos()
        .subscribe(res => {
          this.alumnoService.alumnos = res as Alumno[];
          this.alumnos = res;
          console.log(this.alumnos);

          this.dataSource = new MatTableDataSource(this.alumnos);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
  }
  onDelete(controlNumber) {

    // this.alumnoService.deleteAlumno('13400501').subscribe();
    this.dialogService.openConfirmDialog('¿Estás seguro de eliminar este alumno?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.alumnoService.deleteAlumno(controlNumber).subscribe(
            r => this.doRefreshTable()
          );
          this.notificationService.warn('! Deleted successfully');
        }
      });
  }

  loadDocumentApproval(controlNumber) {
    this.detalleAlumnoService.changeAlumnoToUpdate(controlNumber);
  }

}
