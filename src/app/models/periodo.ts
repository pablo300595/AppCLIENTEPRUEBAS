export class Periodo{
    constructor(periodo = '', yearPeriodo = 0 , fechaApertura = '', fechaCierre = '', activo = '', alumnos = 0 ){
        
        this.periodo = periodo;
        this.yearPeriodo = yearPeriodo;
        this.fechaApertura = fechaApertura;
        this.fechaCierre = fechaCierre;
        this.activo = activo;
        this.alumnos = alumnos;

    }
    periodo? : String;
    yearPeriodo? : Number;
    fechaApertura? : String;
    fechaCierre? : String;
    activo? : String;
    alumnos? : Number;
}