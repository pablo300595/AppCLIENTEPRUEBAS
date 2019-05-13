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
import { PeriodoService } from './../../services/periodo.service';
import { UsuarioService } from './../../services/usuario.service';
import { LoginService } from './../../services/login.service';
import { ExcelService } from './../../services/excel.service';
// Models
import { Periodo } from './../../models/periodo';
import { Alumno } from './../../models/alumno';


@Component({
  selector: 'app-gestionar-periodos',
  templateUrl: './gestionar-periodos.component.html',
  styleUrls: ['./gestionar-periodos.component.css']
})
export class GestionarPeriodosComponent implements OnInit {
  displayedColumns: string[] = ['periodo','yearPeriodo', 'fechaApertura', 'fechaCierre', 'activo', 'actions' ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  checked = false;
  // Filters
  filterA: any;
  filterB: any;
  filterC: any;
  filterD: any;

  alumno: Alumno;
  alumnos: any;

  periodo: Periodo;
  periodos: any;
  period: any;
  idPeriodo: any;

  selectedNoCtrl: string;
  currentUser: string; // Stores JUST the username
  currentUserToLoadCareer: any; // Stores WHOLE current user data
  // Mecanisms
  careerVisualizationMode: boolean;
  // Table
  currentTable: Array<Object>;
  globalTable: Array<Object>;
  asignedTable: Array<Object>;
  exportableTable: Array<Object>;

  constructor(private periodoService: PeriodoService, public dialog: MatDialog, private detalleAlumnoService: DetalleAlumnoService,
    private dialogService: DialogService, private notificationService: NotificationService,
    private usuarioService: UsuarioService, private loginService: LoginService,
    private excelService: ExcelService) {

    this.filterA = { 'value': false, 'filter': 'En captura' };
    this.filterB = { 'value': false, 'filter': 'Enviado' };
    this.filterC = { 'value': false, 'filter': 'Validado' };
    this.filterD = { 'value': false, 'filter': 'Aceptado' };

    this.careerVisualizationMode = false;
  }

  ngOnInit() {
    // this.detalleAlumnoService.currentRowCtrlNumber.subscribe(res => this.selectedNoCtrl = res); // Gets control number of selected row
    /*
    this.loginService.currentUser.subscribe(res => this.currentUser = res); // Gets current username loged
    this.usuarioService.getUsuario(this.currentUser).subscribe(res => this.currentUserToLoadCareer = res);

    setTimeout(() => {
      this.getAsignedTableData(this.currentUserToLoadCareer);
    }, 500);*/
    console.log('');
    this.periodoService.getPeriodos()
      .subscribe(res => {
        this.periodoService.periodos = res as Periodo[];
        this.periodos = res;
        console.log(this.periodos);

        this.dataSource = new MatTableDataSource(this.periodos);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /*
  refreshTablePeriodosData() {
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
  */
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
/*
  onChange(event) {
    if (event.source.idd === 'ck-EnCaptura') { this.filterA.value = event.checked; }
    if (event.source.id === 'ck-Enviado') { this.filterB.value = event.checked; }
    if (event.source.id === 'ck-Validado') { this.filterC.value = event.checked; }
    if (event.source.id === 'ck-Aceptado') { this.filterD.value = event.checked; }

    this.applyFilterOfCheck(event);
  }*/

  /* CalledBy (onChange) checkbox click
  Adjust the global variables to evaluate each element of the current table.
  The properties of the filters are modified to achieve this and in the end
  they are restarted.
  */
  applyFilterOfCheck(filterValue) {
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
    // this.changeMatTableContent();
    this.dataSource.filter = filterValue;

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
  /*CalledBy(applyFilterOfCheck)
    Methods that update MatTableData
  */
  changeMatTableContent() {
    if (this.careerVisualizationMode) {
      this.dataSource = new MatTableDataSource(this.globalTable);
    } else {
      this.dataSource = new MatTableDataSource(this.asignedTable);
    }
  }
  /*UsedBy not Called(applyFilterOfCheck)
    Changes predicate for MatTableData
  */
  defaultPredicateEvaluation(data, filter) {
    const result = (data.controlNumber.includes(filter) ||
      data.lastNameFather.includes(filter) ||
      data.lastNameMother.includes(filter) ||
      data.career.includes(filter)
    );
    return result;
  }
  /* CalledBy(Clicking toggle 'Asignadas/Modo Global')
    Method that checks current visualizationMode, ASIGNADAS request only
    the asigned careers, while MODO GLOBAL request every Alumno
  */
  onChangeVisualMode() {
    this.doRefreshTable();
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
  /* CalledBy(onChangeVisualMode)
    Method that checks current visualizationMode, ASIGNADAS request only
    the asigned careers, while MODO GLOBAL request every Alumno
  */
  doRefreshTable() {
    if (!this.careerVisualizationMode) {
      this.getAsignedTableData(this.currentUserToLoadCareer);
    } else {
      this.getGlobalTableData();
    }
  }
  /* CalledBy(doRefreshTable)
    Method that makes a POST request to https://app-apipruebas.herokuapp.com/alumnos
    where an array composed by Students and its documents is retrieved. Finally Global values are updated with this
  */
  getGlobalTableData() {
    this.periodoService.getPeriodos()
      .subscribe(res => {
        this.periodoService.periodos = res as Periodo[];
        this.periodos = res;
        console.log(this.periodos);

        this.globalTable = this.periodos;
        this.dataSource = new MatTableDataSource(this.periodos);
        this.currentTable = this.exportableTable = this.periodos; // FEAT

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

  getAsignedTableData(periodos) {
    console.log('DATA');
    this.periodoService.getPeriodosByPeriodo(periodos)
      .subscribe(res => {
        this.periodoService.periodos = res as Periodo[];
        this.periodos = res;
        console.log(this.periodos);

        this.asignedTable = this.periodos;
        this.dataSource = new MatTableDataSource(this.periodos);
        this.currentTable = this.exportableTable = this.periodos; // FEAT

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /*
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
  }*/
  /* CalledBy(Clicking button "Descargar Excel")
    Generates XLSX File using the current data provided by dataSource.data
  */
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.exportableTable, 'sample');
  }

  addPeriodo() {
    let lastActivePeriod;
    let newPeriod;
    // this.periodos;
    for (let i = 0; i < this.periodos.length; i++) {
      if (i === this.periodos.length - 1) {
        lastActivePeriod = this.periodos[i].periodo;
      }
    }

    if(lastActivePeriod === 'Enero-Junio') {
      newPeriod = 'Agosto-Diciembre';
    } else {
      newPeriod = 'Enero-Junio';
    }

    const currentDate = new Date();

    for (let i = 0; i < this.periodos.length; i++) {
      if(this.periodos[i].activo == true) {
        this.notificationService.success('Hay un periodo activo, no es posible abrir uno nuevo');
        return;
      }
    }


    this.period = {
      periodo : newPeriod,
      yearPeriodo  : currentDate.getFullYear(),
      fechaApertura : new Date(),
      // fechaCierre : new Date(),
      activo : true
    };
    console.log('');
    this.periodoService.postPeriodo(this.period).subscribe(res =>{
        console.log('Periodo registrado correctamente');
    });

  }

  updatePeriodo(_id) {
    this.period = {
      periodo : this.periodo.periodo,
      yearPeriodo  : this.periodo.yearPeriodo,
      fechaApertura : this.periodo.fechaApertura,
      fechaCierre : new Date(),
      activo : false
    };
    console.log('');
    this.periodoService.putPeriodo(this.period, _id).subscribe(res =>{
      console.log('Periodo actualizado correctamente');
    });
  }

  /*
  onChange(periodo){
    this.updatePeriodo(periodo);
    console.log('');
  }*/


}

