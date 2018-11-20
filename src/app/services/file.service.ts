import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Archivo } from './../models/archivo';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  readonly URL = 'http://localhost:3000/upload';

  constructor(private http: HttpClient) {

  }

  postFile(nombreCarpeta: Archivo) {
    return this.http.post(this.URL, nombreCarpeta);
 }
}
