import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // readonly URL = 'https://app-apipruebas.herokuapp.com/usuarios';
  readonly URL = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {
  }

  getUsuario(id) {
    return this.http.get(this.URL + `/${id}`);
  }
}
