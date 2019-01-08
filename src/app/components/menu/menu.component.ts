import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from './../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  sessionType: string;
  isLogged: boolean;

  constructor(private menuService: MenuService) {

  }

  ngOnInit() {
    this.menuService.currentSession.subscribe(session => this.sessionType = session);
    this.menuService.currentIsLogged.subscribe(status => this.isLogged = status);
  }


}
