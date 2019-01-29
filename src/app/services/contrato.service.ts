import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private acceptedTermsSource = new BehaviorSubject(false);
  currentAcceptedTerms = this.acceptedTermsSource.asObservable();
  constructor() { }

  changeAcceptedTerms(value) {
    this.acceptedTermsSource.next(value);
  }
}
