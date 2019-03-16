import { Injectable } from '@angular/core';
import { Alumno } from './../models/alumno';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioRegistroService {
  // Basic data
  alumnoToUpdate = new Alumno();

  private alumnoToUpdateSource = new BehaviorSubject(this.alumnoToUpdate);
  currentalumnoToUpdate = this.alumnoToUpdateSource.asObservable();

  private firstTryGivenValuesSource = new BehaviorSubject(false);
  currentfirstTryGivenValues = this.firstTryGivenValuesSource.asObservable();

  private allFieldsAreValidSource = new BehaviorSubject(false);
  currentallFieldsAreValid = this.allFieldsAreValidSource.asObservable();

  // HTML Fields
  private fieldLastNameFatherSource = new BehaviorSubject('Valenzuela');
  currentfieldLastNameFather = this.fieldLastNameFatherSource.asObservable();

  private fieldLastNameMotherSource = new BehaviorSubject('Miramontes');
  currentfieldLastNameMother = this.fieldLastNameMotherSource.asObservable();

  private fieldFirstNameSource = new BehaviorSubject('Jose Pablo');
  currentfieldFirstName = this.fieldFirstNameSource.asObservable();

  private fieldPlaceBirthSource = new BehaviorSubject('Tepic, Nayarit');
  currentfieldPlaceBirth = this.fieldPlaceBirthSource.asObservable();

  private fieldDateBirthSource = new BehaviorSubject('');
  currentfieldDateBirth = this.fieldDateBirthSource.asObservable();

  private fieldStatusCivilSource = new BehaviorSubject('Soltero/a');
  currentfieldStatusCivil = this.fieldStatusCivilSource.asObservable();

  private fieldEmailSource = new BehaviorSubject('pabloeng05@gmail.com');
  currentfieldEmail = this.fieldEmailSource.asObservable();

  private fieldCURPSource = new BehaviorSubject('VAMP950530HNTLRB09');
  currentfieldCURP = this.fieldCURPSource.asObservable();

  private fieldNSSSource = new BehaviorSubject(86169562542);
  currentfieldNSS = this.fieldNSSSource.asObservable();

  private fieldStreetSource = new BehaviorSubject('Calcio');
  currentfieldStreet = this.fieldStreetSource.asObservable();

  private fieldColonySource = new BehaviorSubject('10 de Mayo');
  currentfieldColony = this.fieldColonySource.asObservable();

  private fieldCitySource = new BehaviorSubject('Xalisco');
  currentfieldCity = this.fieldCitySource.asObservable();

  private fieldStateSource = new BehaviorSubject('Nayarit');
  currentfieldState = this.fieldStateSource.asObservable();

  private fieldPostalCodeSource = new BehaviorSubject(63780);
  currentfieldPostalCode = this.fieldPostalCodeSource.asObservable();

  private fieldPhoneSource = new BehaviorSubject(3112617945);
  currentfieldPhone = this.fieldPhoneSource.asObservable();

  private fieldEtniaSource = new BehaviorSubject('NO');
  currentfieldEtnia = this.fieldEtniaSource.asObservable();

  private fieldOtherEtniaSource = new BehaviorSubject('');
  currentfieldOtherEtnia = this.fieldOtherEtniaSource.asObservable();

  private fieldDisabilitySource = new BehaviorSubject('NO');
  currentfieldDisability = this.fieldDisabilitySource.asObservable();

  private fieldWhichDisabilitySource = new BehaviorSubject('');
  currentfieldWhichDisability = this.fieldWhichDisabilitySource.asObservable();

  private fieldSchoolSource = new BehaviorSubject('CETIS');
  currentfieldSchool = this.fieldSchoolSource.asObservable();

  private fieldOtherSchoolSource = new BehaviorSubject('');
  currentfieldOtherSchool = this.fieldOtherSchoolSource.asObservable();

  private fieldNameSchoolSource = new BehaviorSubject('');
  currentfieldNameSchool = this.fieldNameSchoolSource.asObservable();

  private fieldControlNumberSource = new BehaviorSubject('');
  currentfieldControlNumber = this.fieldControlNumberSource.asObservable();

  private fieldAverageSource = new BehaviorSubject(100);
  currentfieldAverage = this.fieldAverageSource.asObservable();

  private fieldCareerSource = new BehaviorSubject('Ingeniería en Sistemas Computacionales');
  currentfieldCareer = this.fieldCareerSource.asObservable();

  constructor() {

  }

  changeAlumnoToUpdate(alumno: Alumno) {
    this.alumnoToUpdateSource.next(alumno);
  }

  changefirstTryGivenValues(status: boolean) {
    this.firstTryGivenValuesSource.next(status);
  }

  changeallFieldsAreValid(status: boolean) {
    this.allFieldsAreValidSource.next(status);
  }

  // HTML Fields
  changefieldLastNameFather(status: string) {
    this.fieldLastNameFatherSource.next(status);
  }

  changefieldLastNameMother(status: string) {
    this.fieldLastNameMotherSource.next(status);
  }

  changefieldFirstName(status: string) {
    this.fieldFirstNameSource.next(status);
  }

  changefieldPlaceBirth(status: string) {
    this.fieldPlaceBirthSource.next(status);
  }

  changefieldDateBirth(status: string) {
    this.fieldDateBirthSource.next(status);
  }

  changefieldStatusCivil(status: string) {
    this.fieldStatusCivilSource.next(status);
  }

  changefieldEmail(status: string) {
    this.fieldEmailSource.next(status);
  }

  changefieldCURP(status: string) {
    this.fieldCURPSource.next(status);
  }

  changefieldNSS(status: number) {
    this.fieldNSSSource.next(status);
  }

  changefieldStreet(status: string) {
    this.fieldStreetSource.next(status);
  }

  changefieldColony(status: string) {
    this.fieldColonySource.next(status);
  }

  changefieldCity(status: string) {
    this.fieldCitySource.next(status);
  }

  changefieldState(status: string) {
    this.fieldStateSource.next(status);
  }

  changefieldPostalCode(status: number) {
    this.fieldPostalCodeSource.next(status);
  }

  changefieldPhone(status: number) {
    this.fieldPhoneSource.next(status);
  }

  changefieldOtherEtnia(status: string) {
    this.fieldOtherEtniaSource.next(status);
  }

  changefieldDisability(status: string) {
    this.fieldDisabilitySource.next(status);
  }

  changefieldWhichDisability(status: string) {
    this.fieldWhichDisabilitySource.next(status);
  }

  changefieldSchool(status: string) {
    this.fieldSchoolSource.next(status);
  }

  changefieldOtherSchool(status: string) {
    this.fieldOtherSchoolSource.next(status);
  }

  changefieldNameSchool(status: string) {
    this.fieldNameSchoolSource.next(status);
  }

  changefieldAverage(status: number) {
    this.fieldAverageSource.next(status);
  }

  changefieldCareer(status: string) {
    this.fieldCareerSource.next(status);
  }

  changefieldControlNumber(status: string) {
    this.fieldControlNumberSource.next(status);
  }

}
