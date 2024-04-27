interface receptor {
  nombreUser: string;
  apellidoUser: string;
  correo: string;
  telefono: number;
  estado: string;
  nombreOrg: string;
}
export class receptorC implements receptor{
    constructor(
        public nombreUser: string = '',
        public apellidoUser: string = '',
        public correo: string = '',
        public telefono: number = 0,
        public estado: string = '',
        public nombreOrg: string = '',
      ) {}
}