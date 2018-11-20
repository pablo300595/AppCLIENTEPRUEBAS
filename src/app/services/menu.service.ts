import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private sessionSource = new BehaviorSubject('guest');
  currentSession = this.sessionSource.asObservable();

  private isLoggedSource = new BehaviorSubject(false);
  currentIsLogged = this.isLoggedSource.asObservable();

  constructor() { }

  changeSession(session: string) {
    this.sessionSource.next(session);
  }

  changeLoginStatus(status: boolean) {
    this.isLoggedSource.next(status);
  }

}
