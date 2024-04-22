interface postulantesSubRolVol {
  idmensajeSubRol: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: number;
  estadoMensajeSubRol: string;
  subrol: string;
}
export class postulantesSubRolVolC implements postulantesSubRolVol {
  constructor(
    public idmensajeSubRol: number = 0,
    public nombre: string = '',
    public apellido: string = '',
    public correo: string = '',
    public telefono: number = 0,
    public estadoMensajeSubRol: string = '',
    public subrol: string = ''
  ) {}
}
