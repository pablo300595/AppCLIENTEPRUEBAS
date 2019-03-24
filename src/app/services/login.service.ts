import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from './../models/usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private credentialSource = new BehaviorSubject('N/A');
  currentCredential = this.credentialSource.asObservable();

  private userSource = new BehaviorSubject('N/A');
  currentUser = this.userSource.asObservable();

  private idAlumnoSource = new BehaviorSubject('NO ID');
  currentIdAlumnoSource = this.idAlumnoSource.asObservable();

  private statusInscripcionSource = new BehaviorSubject('No status');
  currentStatusInscripcionSource = this.statusInscripcionSource.asObservable();

  selectedUsuario: Usuario;
  usuarios: Usuario[];

  readonly URL = 'https://app-apipruebas.herokuapp.com/login/auth';
  // readonly URL = 'http://localhost:3000/login/auth';

  constructor(private http: HttpClient) {
    this.selectedUsuario = new Usuario();
  }

  authUser(usuario: Usuario) {
    return this.http.post(this.URL, usuario);
  }

  changeProfileCredential(credential: string) {
    this.credentialSource.next(credential);
  }

  changeProfileUser(user: string) {
    this.userSource.next(user);
  }

  changeIdAlumnoLoged(alumno: string) {
    this.idAlumnoSource.next(alumno);
  }

  changeStatusInscripcion(status: string) {
    this.statusInscripcionSource.next(status);
  }
}
