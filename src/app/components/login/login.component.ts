import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from './../../services/menu.service';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Service variables
  sessionType: string;
  isLogged: boolean;

  sendCredential: string;
  sendUser: string;
  sendIdAlumno: string;
  sendStatusInscripcion: string;
  // Model values
  usuario: Usuario;
  usuarios: any;
  // Auth data
  user: string;
  pass: string;
  // Flags
  hasAuthFailed: boolean;

  constructor(private menuService: MenuService, private router: Router, private loginService: LoginService) {
    this.hasAuthFailed = false;
  }

  ngOnInit() {
    this.menuService.currentSession.subscribe(session => this.sessionType = session);
    this.menuService.currentIsLogged.subscribe(status => this.isLogged = status);

    this.loginService.currentCredential.subscribe(credential => this.sendCredential = credential);
    this.loginService.currentUser.subscribe(user => this.sendUser = user);
    this.loginService.currentIdAlumnoSource.subscribe(id => this.sendIdAlumno = id);
  }

  changeSession() {
    this.authUser();
  }

  changeProfileStatus(credential, user, idAlumno) {
    this.loginService.changeProfileCredential(credential);
    this.loginService.changeProfileUser(user);
    this.loginService.changeIdAlumnoLoged(idAlumno);
  }

  changeLoginStatus(sessionType, isLogged) {
    this.menuService.changeSession(sessionType);
    this.menuService.changeLoginStatus(isLogged);
  }

  authUser() {
    this.usuario = {
      user: this.user,
      pass: this.pass
    };
    this.loginService.authUser(this.usuario)
      .subscribe(res => {
        this.loginService.usuarios = res as Usuario[];
        this.usuarios = res;
        if (res != null) {
          console.log(this.usuarios);
          this.changeLoginStatus(this.usuarios.credential, true);
          this.changeProfileStatus(this.usuarios.credential, this.usuarios.user, this.usuarios.alumno);
          this.router.navigateByUrl('/wizard');
        } else {
          this.hasAuthFailed = true;
          console.log('El usuario NO existe');
        }
      });

    console.log('Autenticando');
  }

}
