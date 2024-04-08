// Interfaz con los datos del usuario
export interface Usuario2 {
    id?: number;
    nombre: string;
    apellido: string;
    password?: string;
    correo: string;
    telefono: number;
    ubicacion?: string;
    estado?: string;
}