interface urlGetDonNoRealizadas {
  idDonacion: number;
  nombreU: string;
  apellidoU: string;
  telefonoU: number;
  cantidad: number;
  tipo_ap: string;
  fechaHoraProg: string;
  estado: string;
  ubicacion: string;
  correoResponsable: string;
  nroRequeridoCol: number;
  nroColaboradores: number;
}
export class urlGetDonNoRealizadasC implements urlGetDonNoRealizadas {
  constructor(
    public idDonacion: number = 0,
    public nombreU: string = '',
    public apellidoU: string = '',
    public telefonoU: number = 0,
    public cantidad: number = 0,
    public tipo_ap: string = '',
    public fechaHoraProg: string = '',
    public estado: string = '',
    public ubicacion: string = '',
    public correoResponsable: string = '',
    public nroRequeridoCol: number = 0,
    public nroColaboradores: number = 0
  ) {}
}
