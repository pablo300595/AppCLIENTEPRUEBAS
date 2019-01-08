import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  credential: string;
  user: string;
  idAlumno: string;
  constructor(private loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.currentCredential.subscribe(credential => this.credential = credential);
    this.loginService.currentUser.subscribe(user => this.user = user);
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumno = id);

  }

}
