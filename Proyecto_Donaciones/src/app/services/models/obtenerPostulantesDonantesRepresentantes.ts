interface obtenerPostulantesDonantesRepresentantes {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: number;
  rol: string;
  nombreOrg: string;
}
export class obtenerPostulantesDonantesRepresentantesC implements obtenerPostulantesDonantesRepresentantes {
  constructor(
    public id: number = 0,
    public nombre: string = '',
    public apellido: string = '',
    public correo: string = '',
    public telefono: number = 0,
    public rol: string = '',
    public nombreOrg: string = '',
  ) {}
}