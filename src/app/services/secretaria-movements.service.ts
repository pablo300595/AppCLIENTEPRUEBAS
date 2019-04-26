import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecretariaMovementsService {
  readonly URL = 'https://app-apipruebas.herokuapp.com/secre-movement';
  constructor(private http: HttpClient) { }

  getMovements() {
    return this.http.get(this.URL);
  }

  getMovementFromSecretary(id) {
    return this.http.get(`${this.URL}/${id}`);
  }

  registerSecretaryMovement(movement) {
    return this.http.post(this.URL, movement);
  }
}
