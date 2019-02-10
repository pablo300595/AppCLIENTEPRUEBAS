export class Alumno {
  constructor(lastNameFather= '', lastNameMother= '', firstName= '', placeBirth= '', dateBirth= '', statusCivil= 'Soltero/a',
              email= '', curp= '', nss= 0, sex= 'H', street= '', colony= '', city= '', state= 'Nayarit', postalCode= 0,
              phone= 0, etnia= '', otherEtnia= '', disability= '',
              whichDisability= '', school= '', otherSchool= '', nameSchool= '',
              average= 1, career= 'Ingeniería en Sistemas Computacionales', documents= [], statusInscripcion= '' ) {

    this.lastNameFather = lastNameFather;
    this.lastNameMother = lastNameMother;
    this.firstName = firstName;
    this.placeBirth = placeBirth;
    this.dateBirth = dateBirth;
    this.statusCivil = statusCivil;
    this.email = email;
    this.curp = curp;
    this.nss = nss;
    this.sex = sex;
    this.street = street;
    this.colony = colony;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.phone = phone;
    this.etnia = etnia;
    this.otherEtnia = otherEtnia;
    this.disability = disability;
    this.whichDisability = whichDisability;
    this.school = school;
    this.otherSchool = otherSchool;
    this.nameSchool = nameSchool;
    this.average = average;
    this.career = career;
    this.documents = documents;
    this.statusInscripcion = statusInscripcion;
  }

  lastNameFather?: String;
  lastNameMother?: String;
  firstName?: String;
  placeBirth?: String;
  dateBirth?: String;
  statusCivil?: String;
  email?: String;
  curp?: String;
  nss?: Number;
  sex?: String;
  street?: String;
  colony?: String;
  city?: String;
  state?: String;
  postalCode?: Number;
  phone?: Number;
  etnia?: String;
  otherEtnia?: String;
  disability?: String;
  whichDisability?: String;
  school?: String;
  otherSchool?: String;
  nameSchool?: String;
  average?: Number;
  career?: String;
  documents?: String[];
  statusInscripcion?: String;
}
