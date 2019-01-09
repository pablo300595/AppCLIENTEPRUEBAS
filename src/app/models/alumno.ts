export class Alumno {
  constructor(lastNameFather='', lastNameMother='', firstName= '', placeBirth= '', dateBirth= '', statusCivil= '',
              street= '', colony= '', city= '', state= '', postalCode= '',
              phone= '', email= '', etnia= '', otherEtnia= '', disability= '',
              whichDisability= '', school= '', otherSchool= '', nameSchool= '',
              average= '', career= '', documents= [] ) {
    // this._id = _id;
    this.lastNameFather = lastNameFather;
    this.lastNameMother = lastNameMother;
    this.firstName = firstName;
    this.placeBirth = placeBirth;
    this.dateBirth = dateBirth;
    this.statusCivil = statusCivil;
    this.street = street;
    this.colony = colony;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.phone = phone;
    this.email = email;
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
  }

  //_id: string;
  lastNameFather: String;
  lastNameMother: String;
  firstName: String;
  placeBirth: String;
  dateBirth: String;
  statusCivil: String;
  street: String;
  colony: String;
  city: String;
  state: String;
  postalCode: String;
  phone: String;
  email: String;
  etnia: String;
  otherEtnia: String;
  disability: String;
  whichDisability: String;
  school: String;
  otherSchool: String;
  nameSchool: String;
  average: String;
  career: String;
  documents: String[];
}
