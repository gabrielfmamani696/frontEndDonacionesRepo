
interface currentUsuarioSimpleData {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: number;
  rol: string;
  rolVol: string;
  nombreOrg: string;
}

export class currentUsuarioSimpleDataC implements currentUsuarioSimpleData {
  constructor(
    public nombre: string = '',
    public apellido: string = '',
    public correo: string = '',
    public telefono: number = 0,
    public rol: string = '',
    public rolVol: string = '',
    public nombreOrg: string = ''
  ) {}
}
