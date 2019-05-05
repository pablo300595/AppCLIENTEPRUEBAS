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
import { ExcelService } from './../../services/excel.service';
// Models
import { Alumno } from './../../models/alumno';

export interface PeriodoMes {
  value: string;
  viewValue: string;
}
export interface PeriodoYear {
  value: number;
  viewValue: number;
}

@Component({
  selector: 'app-detalle-alumno-jefe',
  templateUrl: './detalle-alumno-jefe.component.html',
  styleUrls: ['./detalle-alumno-jefe.component.css']
})
export class DetalleAlumnoJefeComponent implements OnInit {
  displayedColumns: string[] = [ 'check', 'controlNumber', 'completeName', 'career', 'statusInscripcion', 'actions'];
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
  isGlobalModeEnabled: boolean;
  // Table
  currentTable: Array<Object>;
  currentPeriodTable: Array<Object>;
  globalTable: Array<Object>;
  asignedTable: Array<Object>;
  exportableTable: Array<Object>;
  // Interface data
  mesPeriodos: PeriodoMes[] = [
    { value: 'Enero-Junio', viewValue: 'Enero-Junio' },
    { value: 'Agosto-Diciembre', viewValue: 'Agosto-Diciembre' }
  ];
  yearPeriodos: PeriodoYear[] = [
    { value: 2010, viewValue: 2010 },
    { value: 2011, viewValue: 2011 },
    { value: 2012, viewValue: 2012 },
    { value: 2013, viewValue: 2013 },
    { value: 2014, viewValue: 2014 },
    { value: 2015, viewValue: 2015 },
    { value: 2016, viewValue: 2016 },
    { value: 2017, viewValue: 2017 },
    { value: 2018, viewValue: 2018 },
    { value: 2019, viewValue: 2019 }
  ];
  // NgVariables from components
  currentPeriodMonth = 'Enero-Junio';
  currentPeriodYear;
  tableCheck: Array<boolean>;
  constructor(private alumnoService: AlumnoService, public dialog: MatDialog, private detalleAlumnoService: DetalleAlumnoService,
    private dialogService: DialogService, private notificationService: NotificationService,
    private usuarioService: UsuarioService, private loginService: LoginService,
    private excelService: ExcelService) {
    this.filterA = { 'value': false, 'filter': 'En captura' };
    this.filterB = { 'value': false, 'filter': 'Enviado' };
    this.filterC = { 'value': false, 'filter': 'Validado' };
    this.filterD = { 'value': false, 'filter': 'Aceptado' };

    this.isGlobalModeEnabled = false;
    this.currentPeriodYear = (new Date()).getFullYear();
    this.tableCheck = [];
  }

  ngOnInit() {
    // this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res); // Gets control number of selected row
    this.loginService.currentUser.subscribe(res => this.currentUser = res); // Gets current username loged
    this.usuarioService.getUsuario(this.currentUser).subscribe(res => this.currentUserToLoadCareer = res);

    setTimeout(() => {
      this.getAsignedTableData(this.currentUserToLoadCareer);
    }, 500);
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
  /* CalledBy (Writing in search bar)
    Method that check if the actual text provided by search bar matches
    the global predicate. Then it filt
  */
  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = ((data: any, filter: string) => {
      return this.defaultPredicateEvaluation(data, filter);
    });
    this.dataSource = new MatTableDataSource(this.currentTable);
    this.exportableTable = this.currentTable;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /* CalledBy (Clicking check)
  After clicked check changes the global value variable. Then calls a method
  that evaluate each element from the global dataSource.
  */
  onChange(event) {
    for (let i = 0; i < this.tableCheck.length; i++) {this.tableCheck[i] = false;}
    if (event.source.id === 'ck-EnCaptura') { this.filterA.value = event.checked; }
    if (event.source.id === 'ck-Enviado') { this.filterB.value = event.checked; }
    if (event.source.id === 'ck-Validado') { this.filterC.value = event.checked; }
    if (event.source.id === 'ck-Aceptado') { this.filterD.value = event.checked; }

    this.applyFilterOfCheck(event);
  }
  /* CalledBy (onChange) checkbox click
  Adjust the global variables to evaluate each element of the current table.
  The properties of the filters are modified to achieve this and in the end
  they are restarted.
  */
  applyFilterOfCheck(filterValue) {
    if (this.isGlobalModeEnabled) {
      this.dataSource = new MatTableDataSource(this.globalTable);
    } else {
      this.dataSource = new MatTableDataSource(this.currentPeriodTable);
    }
    if (!this.filterA.value) { this.filterA.filter = ''; }
    if (!this.filterB.value) { this.filterB.filter = ''; }
    if (!this.filterC.value) { this.filterC.filter = ''; }
    if (!this.filterD.value) { this.filterD.filter = ''; }
    if (this.filterA.value === false && this.filterB.value === false &&
      this.filterC.value === false && this.filterD.value === false) {
      this.filterA.filter = 'En captura';
      this.filterB.filter = 'Enviado';
      this.filterC.filter = 'Validado';
      this.filterD.filter = 'Aceptado';
      this.doRefreshTable();
    }
    // Segment that validates element by element (Called after this.dataSource.filter)
    this.currentTable = [];
    this.dataSource.filterPredicate = ((data: any, filter: string) => {
      return this.customPredicateEvaluation(data);
    });
    // Adjust Table data according to VisualizationMode
    this.dataSource.filter = 'true';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.filterA.filter = 'En captura'; this.filterB.filter = 'Enviado';
    this.filterC.filter = 'Validado'; this.filterD.filter = 'Aceptado';
    this.exportableTable = this.currentTable;
  }
  /* CalledBy(applyFilterOfCheck)
    Method that evaluates each element given and determines if it
    meets the given condition
  */
  customPredicateEvaluation(data) {
    console.log(data.statusInscripcion);
    const result = (data.statusInscripcion === this.filterA.filter) ||
      (data.statusInscripcion === this.filterB.filter) ||
      (data.statusInscripcion === this.filterC.filter) ||
      (data.statusInscripcion === this.filterD.filter);
    if (result) { this.currentTable.push(data); }
    return result;
  }

  /*UsedBy not Called(applyFilterOfCheck)
    Changes predicate for MatTableData*/
  defaultPredicateEvaluation(data, filter) {
    const result = (data.controlNumber.includes(filter) ||
      data.lastNameFather.includes(filter) ||
      data.lastNameMother.includes(filter) ||
      data.career.includes(filter)
    );
    return result;
  }
  /*CalledBy(Changing Period Select. Year and Cicle)*/
  onChangePeriod(filterValue) {
    // Clean check content and dataSource init
    this.isGlobalModeEnabled = false;
    this.filterA = { 'value': false, 'filter': 'En captura' };
    this.filterB = { 'value': false, 'filter': 'Enviado' };
    this.filterC = { 'value': false, 'filter': 'Validado' };
    this.filterD = { 'value': false, 'filter': 'Aceptado' };
    this.dataSource = new MatTableDataSource(this.globalTable);
    // Segment that validates element by element (Called after this.dataSource.filter)
    this.currentPeriodTable = [];
    this.dataSource.filterPredicate = ((data: any, filter: string) => {
      return this.customPredicateEvaluationPeriod(data);
    });
    // Adjust Table data according to VisualizationMode
    this.dataSource.filter = filterValue;
    this.dataSource.paginator.firstPage();
  }

  customPredicateEvaluationPeriod(data) {
    const result = (data.alumno_periodo[0].añoPeriodo === this.currentPeriodYear
      && data.alumno_periodo[0].periodo === this.currentPeriodMonth);
    if (result) { this.currentPeriodTable.push(data); }
    return result;
  }

  /*CalledBy (Clicking group icon button in row item action)
  Allows to configure the modal window configuration and calls a detalleAlumnoService in order to
  send the control number by a service variable.
  */
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
  /* CalledBy(onChangeVisualMode)
    Method that checks current visualizationMode, ASIGNADAS request only
    the asigned careers, while MODO GLOBAL request every Alumno
  */
  doRefreshTable() {
    this.changeToGlobalMode('');
    // this.dataSource = new MatTableDataSource(this.currentPeriodTable); TO UNCOMMENT
    // this.getGlobalTableData();
  }
  /* CalledBy(doRefreshTable)
    Method that makes a POST request to https://app-apipruebas.herokuapp.com/alumnos
    where an array composed by Students and its documents is retrieved. Finally Global values are updated with this
  */
  getGlobalTableData() {
    this.alumnoService.getAlumnos()
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);

        this.globalTable = this.alumnos;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.currentTable = this.exportableTable = this.alumnos; // FEAT

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  /* CalledBy(ngOnInit, doRefreshTable)
    Method that uses the object brought by the parameter (ex: {_id:"123456",active:false,career:Array,
    credential:'secretary',user:'secreA',pass:'1234'}).
    Then it makes a POST request to https://app-apipruebas.herokuapp.com/alumnos/career
    where an array composed by Students and its documents is retrieved. Finally Global values are updated with this
  */
  getAsignedTableData(careers) {
    console.log('DATA');
    this.alumnoService.getAlumnosByCareer(careers)
      .subscribe(res => {
        this.alumnoService.alumnos = res as Alumno[];
        this.alumnos = res;
        console.log(this.alumnos);

        this.asignedTable = this.alumnos;
        this.globalTable = this.alumnos;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.tableCheck = new Array(this.dataSource.data.length);
        for (let i = 0; i < this.tableCheck.length; i++) { this.tableCheck[i] = false; }
        this.currentTable = this.exportableTable = this.alumnos; // FEAT

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.forceFilter(res);
      });
  }

  onDelete(controlNumber) {
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
  /* CalledBy(Clicking button "Descargar Excel")
    Generates XLSX File using the current data provided by dataSource.data
  */
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.exportableTable, 'sample');
  }
  /*CalledBy(Clicking one row)
  Changes the value from the global array tableCheck that stores y a row is clicked*/
  changeCheck(index) {
    this.tableCheck[index] = !this.tableCheck[index];
  }
  /*CalledBy(getAsignedTableData) Initially forces to start with period mode filtering*/
  forceFilter(filterValue) {
    // Clean check content and dataSource init
    this.filterA = { 'value': false, 'filter': 'En captura' };
    this.filterB = { 'value': false, 'filter': 'Enviado' };
    this.filterC = { 'value': false, 'filter': 'Validado' };
    this.filterD = { 'value': false, 'filter': 'Aceptado' };
    this.dataSource = new MatTableDataSource(this.globalTable);
    // Segment that validates element by element (Called after this.dataSource.filter)
    this.currentPeriodTable = [];
    this.dataSource.filterPredicate = ((data: any, filter: string) => {
      return this.customPredicateEvaluationPeriod(data);
    });
    // Adjust Table data according to VisualizationMode
    this.dataSource.filter = filterValue;

    if (this. dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /*CalledBy() */
  changeToGlobalMode(filter) {
    if (this.isGlobalModeEnabled) {
      this.getGlobalTableData();
      this.forceGlobalFilter(filter);
    } else {
      this.onChangePeriod(filter + '5');
    }
  }
  /* */
  forceGlobalFilter(filter) {
    // Clean check content and dataSource init
    this.filterA = { 'value': false, 'filter': 'En captura' };
    this.filterB = { 'value': false, 'filter': 'Enviado' };
    this.filterC = { 'value': false, 'filter': 'Validado' };
    this.filterD = { 'value': false, 'filter': 'Aceptado' };

    this.dataSource.filterPredicate = ((data: any, filt: string) => {
      return this.customGlobalFilter(data);
    });
    this.dataSource.filter = filter;
  }

  customGlobalFilter(data) {
    return true;
  }
}
