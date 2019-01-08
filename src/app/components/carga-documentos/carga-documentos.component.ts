import { Component, OnInit } from '@angular/core';
import { FileService } from './../../services/file.service';
import { LoginService } from './../../services/login.service';
import { Archivo } from './../../models/archivo';

@Component({
  selector: 'app-carga-documentos',
  templateUrl: './carga-documentos.component.html',
  styleUrls: ['./carga-documentos.component.css']
})
export class CargaDocumentosComponent implements OnInit {
  idAlumnoLoged: String;
  archivoAlumno: Archivo;
  constructor(private fileService: FileService, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
  }

  uploadFile() {
    console.log(this.idAlumnoLoged);
    this.archivoAlumno = {
       nombreCarpeta: this.idAlumnoLoged
    };
    this.fileService.postFile(this.archivoAlumno)
        .subscribe();
        console.log('Archivo cargado!!!');
  }

}
