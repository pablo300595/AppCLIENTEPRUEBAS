import { Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// Services
import { SecretariaMovementsService } from './../../services/secretaria-movements.service';

@Component({
  selector: 'app-secretaria-movements',
  templateUrl: './secretaria-movements.component.html',
  styleUrls: ['./secretaria-movements.component.css']
})
export class SecretariaMovementsComponent implements OnInit {
  displayedColumns: string[] = ['secreFullName', 'alumnoFullName', 'document', 'action', 'dateModificationServer',
  'dataModified'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private secretariaMovementsService: SecretariaMovementsService) { }

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
