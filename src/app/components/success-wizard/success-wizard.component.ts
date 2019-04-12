import { Component, OnInit, ViewChild } from '@angular/core';
// Models
import { Alumno } from './../../models/alumno';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogRef } from '@angular/material';
// Services
import { AlumnoService } from './../../services/alumno.service';
import { UsuarioService } from './../../services/usuario.service';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-success-wizard',
  templateUrl: './success-wizard.component.html',
  styleUrls: ['./success-wizard.component.css']
})
export class SuccessWizardComponent implements OnInit {
  // Variables for MatTable Content
  documentation: any;
  displayedColumns: string[] = ['documentName', 'status', 'observacion'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // Service variables
  currentUser: any;
  constructor(private alumnoService: AlumnoService, private usuarioService: UsuarioService, 
    private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.currentUser.subscribe(res => this.currentUser = res);
  }

  awaitForValidationData() {
    this.alumnoService.getAlumnoDocumentation(this.currentUser).subscribe(res => {
      this.documentation = res as Object[];
      this.dataSource = new MatTableDataSource(this.documentation);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
