interface getAllPostulantesRolVol {
  idmensaje: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: number;
  rol: string;
}
export class getAllPostulantesRolVolC implements getAllPostulantesRolVol {
    constructor(
        public idmensaje: number = 0,
        public nombre: string = '',
        public apellido: string = '',
        public correo: string = '',
        public telefono: number = 0,
        public rol: string = '',
      ) {}
}
