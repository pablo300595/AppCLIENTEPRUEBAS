import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import { Archivo } from './../models/archivo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  // readonly URL = 'http://localhost:3000/upload';
  readonly URL = 'https://app-apipruebas.herokuapp.com/upload';

  constructor(private http: HttpClient) {

  }

  postFile(nombreCarpeta: Archivo) {
    return this.http.post(this.URL, nombreCarpeta);
  }

  uploadFile(url: string, file: File): any {

    const formData = new FormData();
    formData.append('upload', file);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
  }
}
