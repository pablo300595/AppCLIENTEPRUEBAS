import { Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// Services
import { SecretariaMovementsService } from './../../services/secretaria-movements.service';

import {MatPaginatorIntl} from '@angular/material';

@Component({
  selector: 'app-secretaria-movements',
  templateUrl: './secretaria-movements.component.html',
  styleUrls: ['./secretaria-movements.component.css']
})
export class SecretariaMovementsComponent extends MatPaginatorIntl implements OnInit {
  displayedColumns: string[] = ['secreFullName', 'alumnoFullName', 'document', 'action', 'dateModificationServer',
  'dataModified'];
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




  constructor(private secretariaMovementsService: SecretariaMovementsService) { super(); }

  ngOnInit() {
    this.loadLogTransactions();
  }
  /*CalledBy (ngOnInit) Method that makes a GET request to https://app-apipruebas.herokuapp.com/secre-movement
  then Object retrived will be used for fill the table*/
  loadLogTransactions() {
    this.secretariaMovementsService.getMovements().subscribe(res => {
      this.dataSource = new MatTableDataSource(res as any);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
