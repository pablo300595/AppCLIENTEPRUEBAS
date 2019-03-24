import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarDocumentosService {
  private rowDocumentNameSource = new BehaviorSubject('');
  currentRowDocumentName = this.rowDocumentNameSource.asObservable();
  constructor() { }

  changeDocumentToUpdate(docName) {
    this.rowDocumentNameSource.next(docName);
  }
}
