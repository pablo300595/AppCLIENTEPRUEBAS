export class Periodo {
    constructor(periodo = '', yearPeriodo = 0 , fechaApertura = new Date(), fechaCierre = new Date(), activo = false, alumnos = 0 ) {

        this.periodo = periodo;
        this.yearPeriodo = yearPeriodo;
        this.fechaApertura = fechaApertura;
        this.fechaCierre = fechaCierre;
        this.activo = activo;
        this.alumnos = alumnos;

    }
    periodo?: String;
    yearPeriodo?: Number;
    fechaApertura?: Date;
    fechaCierre?: Date;
    activo?: boolean;
    alumnos?: Number;
}