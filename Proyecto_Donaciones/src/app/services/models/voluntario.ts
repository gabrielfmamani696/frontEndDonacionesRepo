interface voluntario {
  nombreUser: string;
  apellido: string;
  correo: string;
  telefono: number;
  estadoGeneralUser: string;
  subrol: string;
}
export class voluntarioC implements voluntario{
    constructor(
        public nombreUser: string = '',
        public apellido: string = '',
        public correo: string = '',
        public telefono: number = 0,
        public estadoGeneralUser: string = '',
        public subrol: string = '',
      ) {}
}