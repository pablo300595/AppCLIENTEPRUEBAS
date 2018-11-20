import { Component, OnInit } from '@angular/core';
import { AlumnoService} from './../../services/alumno.service';
import { LoginService } from './../../services/login.service';
import { Alumno } from './../../models/alumno';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-formulario-registro-alumno',
  templateUrl: './formulario-registro-alumno.component.html',
  styleUrls: ['./formulario-registro-alumno.component.css']
})
export class FormularioRegistroAlumnoComponent implements OnInit {
  fieldName: String = '';
  fieldPlaceBirth: String = '';
  fieldDateBirth: String = '';
  fieldStatusCivil: String = '';
  fieldStreet: String = '';
  fieldColony: String = '';
  fieldCity: String = '';
  fieldState: String = '';
  fieldPostalCode: String = '';
  fieldPhone: String = '';
  fieldEmail: String = '';
  fieldEtnia: String = '';
  fieldOtherEtnia: String = '';
  fieldDisability: String = '';
  fieldWhichDisability: String = '';
  fieldSchool: String = '';
  fieldOtherSchool: String = '';
  fieldNameSchool: String = '';
  fieldAverage: String = '';
  fieldCareer: String = '';
  fieldDocuments: String[] = [];

  alumno: Alumno;
  alumnos: any;

  idAlumnoLoged: String;

  constructor(private alumnoService: AlumnoService, private loginService: LoginService) {

  }

  ngOnInit() {
    this.loginService.currentIdAlumnoSource.subscribe(id => this.idAlumnoLoged = id);
  }

  insertAlumno() {

  }

  getAlumnos() {
    this.alumno = {
      name: this.fieldName,
      placeBirth: this.fieldPlaceBirth,
      dateBirth: this.fieldDateBirth,
      statusCivil: this.fieldStatusCivil,
      street: this.fieldStreet,
      colony: this.fieldColony,
      city: this.fieldCity,
      state: this.fieldState,
      postalCode: this.fieldPostalCode,
      phone: this.fieldPhone,
      email: this.fieldEmail,
      etnia: this.fieldEtnia,
      otherEtnia: this.fieldOtherEtnia,
      disability: this.fieldDisability,
      whichDisability: this.fieldWhichDisability,
      school: this.fieldSchool,
      otherSchool: this.fieldOtherSchool,
      nameSchool: this.fieldNameSchool,
      average: this.fieldAverage,
      career: this.fieldCareer,
      documents: this.fieldDocuments
    };
      console.log('Datos del formulario');
      console.log(this.alumno);
  }

  updateAlumno() {
    this.alumno = {
      name: this.fieldName,
      placeBirth: this.fieldPlaceBirth,
      dateBirth: this.fieldDateBirth,
      statusCivil: this.fieldStatusCivil,
      street: this.fieldStreet,
      colony: this.fieldColony,
      city: this.fieldCity,
      state: this.fieldState,
      postalCode: this.fieldPostalCode,
      phone: this.fieldPhone,
      email: this.fieldEmail,
      etnia: this.fieldEtnia,
      otherEtnia: this.fieldOtherEtnia,
      disability: this.fieldDisability,
      whichDisability: this.fieldWhichDisability,
      school: this.fieldSchool,
      otherSchool: this.fieldOtherSchool,
      nameSchool: this.fieldNameSchool,
      average: this.fieldAverage,
      career: this.fieldCareer,
      documents: this.fieldDocuments
    };
    this.alumnoService.putAlumno(this.alumno, this.idAlumnoLoged)
        .subscribe();
        console.log('Alumno actualizado con exito!!!');
  }

}
