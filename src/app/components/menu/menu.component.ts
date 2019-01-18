import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from './../../services/menu.service';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // Menu service
  sessionType: string;
  isLogged: boolean;
  // Login service
  sendUser: string;

  constructor(private menuService: MenuService, private loginService: LoginService) {

  }

  ngOnInit() {
    this.menuService.currentSession.subscribe(session => this.sessionType = session);
    this.menuService.currentIsLogged.subscribe(status => this.isLogged = status);

    this.loginService.currentUser.subscribe(user => this.sendUser = user);
  }

  logout() {
    this.changeLoginStatus('guest', false);
  }

  changeLoginStatus(sessionType, isLogged) {
    this.menuService.changeSession(sessionType);
    this.menuService.changeLoginStatus(isLogged);
  }

}
