import { Component, OnInit } from '@angular/core';
import { ContratoService } from './../../services/contrato.service';
import { AlumnoService } from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';


@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {
  acceptedTerms: boolean;

  currentUsername : String;  

  alumno: Object;
  fieldFirstName : String;
  fieldLastNameFather : String;
  fieldLastNameMother : String;
  currentDate : Date;
  currentMonth : String;

  constructor(private contratoService: ContratoService,
              private loginService: LoginService,
              private alumnoService: AlumnoService) {
    this.contratoService.currentAcceptedTerms.subscribe(accepted => this.acceptedTerms = accepted);
    this.currentDate = new Date();
    this.convertNumericalMonth();
  }

  ngOnInit() {
  }

  onChange(event) {
    this.contratoService.changeAcceptedTerms(event.checked);
  }

  convertNumericalMonth(){
    switch(this.currentDate.getMonth()){
      case 0: {
        this.currentMonth = "Enero";
        break;
      }
      case 1: {
        this.currentMonth = "Febrero";
        break;
      }
      case 2: {
        this.currentMonth = "Marzo";
        break;
      }
      case 3: {
        this.currentMonth = "Abril";
        break;
      }
      case 4: {
        this.currentMonth = "Mayo";
        break;
      }
      case 5: {
        this.currentMonth = "Junio";
        break;
      }
      case 6: {
        this.currentMonth = "Julio";
        break;
      }
      case 7: {
        this.currentMonth = "Agosto";
        break;
      }
      case 8: {
        this.currentMonth = "Septiembre";
        break;
      }
      case 9: {
        this.currentMonth = "Octubre";
        break;
      }
      case 10: {
        this.currentMonth = "Noviembre";
        break;
      }
      case 11: {
        this.currentMonth = "Diciembre";
        break;
      } 
    }
  }

  loadAlumnoData(){
    this.loginService.currentUser.subscribe(res => this.currentUsername = res);
    this.alumnoService.getAlumno(this.currentUsername).subscribe(res => {
      this.alumno = res as Object;
      this.fieldFirstName = this.alumno[0].firstName;
      this.fieldLastNameFather = this.alumno[0].lastNameFather;
      this.fieldLastNameMother = this.alumno[0].lastNameMother;

    });
  }

}
