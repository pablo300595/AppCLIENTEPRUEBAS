import { Component, OnInit, ViewChild } from '@angular/core';
// Material
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
// Services
import { MessagesService } from './../../services/messages.service';
import { SecretariaService } from './../../services/secretaria.service';
import { UsuarioService } from './../../services/usuario.service';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-roles-carreras',
  templateUrl: './roles-carreras.component.html',
  styleUrls: ['./roles-carreras.component.css']
})
export class RolesCarrerasComponent implements OnInit {
  currentUser: string; // Stores JUST the username
  currentUserToLoadCareer: any; // Stores WHOLE current user data

  testData: any[];
  secretaries: any[];
  radioSelected: any;
  constructor(private messagesService: MessagesService, private secretariaService: SecretariaService,
    private usuarioService: UsuarioService, private loginService: LoginService) {

    }

  ngOnInit() {
    this.secretaries = [
      {index: 0, secreName: 'Celia Estefania', _id: '5cba1f8a2ebc2b0017e1b6ce', asignation: []},
      {index: 1, secreName: 'Sofia Estrella',  _id: '5ced07121c9d440000db48ca', asignation: []}
    ];
    this.testData = [
      {pos: 0, career: 'Ingenieria en Sistemas Computacionales', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 1, career: 'Maestria en Ciencias en Alimentos', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 2, career: 'Ingenieria Bioquimica', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 3, career: 'Arquitectura', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 4, career: 'Ingenieria Civil', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 5, career: 'Ingenieria Electrica', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 6, career: 'Ingenieria en Gestion Empresarial', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 7, career: 'Ingenieria Industrial', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 8, career: 'Ingenieria Mecatronica', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 9, career: 'Ingenieria Quimica', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 10, career: 'Ingenieria en Tecnologia de la Informacion y Comunicaciones',
      _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 11, career: 'Licenciatura en Administracion', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 12, career: 'Maestria en Tecnologias de la Informacion', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''},
      {pos: 13, career: 'Doctorado en Ciencias en Alimentos', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca'],
      selectedId: ''}
    ];
  }

  createAsignation(data, radioInfo) {
    const searchedID = data._id[radioInfo.value];
    this.testData[data.pos].selectedId = searchedID;
  }

  updateCareerAsignation() {
    // Clean asignation Array
    for (let i = 0; i < this.secretaries.length; i++) {
      this.secretaries[i].asignation = [];
    }
    // Generate asignation Array
    for (let i = 0; i < this.secretaries.length; i++) {
      for (let j = 0; j < this.testData.length; j++) {
        if (this.secretaries[i]._id === this.testData[j].selectedId) {
          this.secretaries[i].asignation.push(this.testData[j].career);
        }
      }
    }
    setTimeout(() => {
      for (let i = 0; i < this.secretaries.length; i++) {
        this.secretariaService.updateSecretariaCareer(this.secretaries[i].asignation, this.secretaries[i]._id).subscribe( res => {
          this.messagesService.success('¡Asignación de carreras actualizada!');
        });
      }
    }, 500);
  }
}
