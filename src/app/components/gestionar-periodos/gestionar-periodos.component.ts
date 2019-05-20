// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// Services
import { DetalleAlumnoService } from './../../services/detalle-alumno.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PeriodoService } from './../../services/periodo.service';
// Models
import { Periodo } from './../../models/periodo';



@Component({
  selector: 'app-gestionar-periodos',
  templateUrl: './gestionar-periodos.component.html',
  styleUrls: ['./gestionar-periodos.component.css']
})
export class GestionarPeriodosComponent implements OnInit {
  displayedColumns: string[] = ['periodo', 'yearPeriodo', 'fechaApertura', 'fechaCierre', 'activo', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  periodo: Periodo;
  periodos: any;
  period: any;
  idPeriodo: any;

  constructor(private periodoService: PeriodoService, public dialog: MatDialog, private detalleAlumnoService: DetalleAlumnoService,
    private dialogService: DialogService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.refreshDataSource();
  }
  /*CalledBy(ngOnInit, doRefreshTable)
    Method that uses the object brought by the parameter (ex: {_id:"123456",active:false,career:Array,
    credential:'secretary',user:'secreA',pass:'1234'}).
    Then it makes a POST request to https://app-apipruebas.herokuapp.com/alumnos/career
    where an array composed by Students and its documents is retrieved. Finally Global values are updated with this*/
  addPeriodo() {
    let lastActivePeriod;
    let newPeriod;
    for (let i = 0; i < this.periodos.length; i++) {
      if (i === 0) {
        lastActivePeriod = this.periodos[i].periodo;
      }
    }

    if (lastActivePeriod === 'Enero-Junio') {
      newPeriod = 'Agosto-Diciembre';
    } else {
      newPeriod = 'Enero-Junio';
    }

    const currentDate = new Date();

    for (let i = 0; i < this.periodos.length; i++) {
      if (this.periodos[i].activo === true) {
        this.notificationService.warn('Hay un periodo activo, no es posible abrir uno nuevo');
        return;
      }
    }
    let currentYear = this.periodos[0].yearPeriodo;
    if (this.periodos[0].periodo === 'Agosto-Diciembre') {
      currentYear++;
    }

    this.period = {
      periodo: newPeriod,
      yearPeriodo: currentYear,
      fechaApertura: new Date(),
      // fechaCierre : new Date(),
      activo: true
    };
    this.periodoService.postPeriodo(this.period).subscribe(res => {
      this.refreshDataSource();
      this.notificationService.success('Periodo registrado correctamente');
    });
  }

  updatePeriodo(row) {
    this.dialogService.openConfirmDialog('¿Estás seguro de cerrar este Periodo?')
      .afterClosed().subscribe(res => {
        if (res) {
          const customPeriod: Periodo = {
            periodo: row.periodo,
            yearPeriodo: row.yearPeriodo,
            fechaApertura: row.fechaApertura,
            fechaCierre: new Date(),
            activo: false
          };
        
          console.log('');
          this.periodoService.putPeriodo(customPeriod, row._id).subscribe(res => {
            this.refreshDataSource();
            this.notificationService.success('Periodo se ha cerrado correctamente');
          });
        }
      });
  }


  reverseDataSource() {
    const temporalDataSource = new Array(this.dataSource.data.length);
    let j = 0;
    for (let i = this.dataSource.data.length - 1; i > -1; i--) {
      temporalDataSource[j] = this.dataSource.data[i];
      j++;
    }
    this.dataSource.data = temporalDataSource;
    this.periodos = temporalDataSource;
  }

  refreshDataSource() {
    this.periodoService.getPeriodos()
      .subscribe(res => {
        this.periodoService.periodos = res as Periodo[];
        this.periodos = res;

        this.dataSource = new MatTableDataSource(this.periodos);
        this.reverseDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

}

