// Interfaz con los datos del usuario
export interface Usuario {
    id: number;
    nombre?: string;
    apellido?: string;
    contrasena: string;
    confcontrasena?: string;
    correo: string;
    telefono?: number;

}