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
  secretaries: Object[];
  radioSelected: any;
  constructor(private messagesService: MessagesService, private secretariaService: SecretariaService,
    private usuarioService: UsuarioService, private loginService: LoginService) { }

  ngOnInit() {
    this.secretaries = [
      {index: 0, secreName: 'Celia Estefania'},
      {index: 1, secreName: 'Sofia Estrella'}
    ];
    this.testData = [
      {pos: 0, career: 'Ingeniería en Sistemas Computacionales', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca']},
      {pos: 1, career: 'Maestría en Ciencias en Alimentos', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca']},
      {pos: 2, career: 'Ingeniería Bioquímica', _id: ['5cba1f8a2ebc2b0017e1b6ce', '5ced07121c9d440000db48ca']}
    ];
  }

  createAsignation(data, radioInfo) {
    let newArray: any = new Array(this.testData[0]._id.length, this.testData.length + 1);
    const searchedID = data._id[radioInfo.value];

    newArray[0][0] = 'gege';
    for (let i = 0,  j = 0; i < this.testData[0]._id.length ; i++) {
      newArray[i][j] = 'gege';
    }

    for (let i = 0; i < this.testData[0]._id.length; i++) {
      for (let j = 0; j < this.testData.length; j++) {
        if (searchedID) {
          console.log(searchedID);
          newArray[i][j]  = '';
        }
      }
    }
    console.log(newArray);
  }

  updateCareerAsignation() {
    let _id = '5cba1f8a2ebc2b0017e1b6ce';
    const newCareer = [];
    this.secretariaService.updateSecretariaCareer(newCareer, _id).subscribe( res => {
      this.messagesService.success('¡Asignación de carreras actualizada!');
    });
  }
}
