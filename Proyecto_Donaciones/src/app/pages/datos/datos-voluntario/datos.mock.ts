export interface Voluntario {
    id: number | string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: number;
}
// todos los campos deben tener datos
export const VoluntariosList: Voluntario[] = [
    {id: 1, nombre: 'ed', apellido: 'ed', correo: '@gmail.com', telefono: 12345678},
    {id: 2, nombre: 'ed', apellido: 'ed', correo: '', telefono: 12345678},
    {id: 3, nombre: 'ed', apellido: 'ed', correo: '', telefono: 12345678},
    {id: 4, nombre: 'ed', apellido: 'ed', correo: '', telefono: 12345678},
    {id: 5, nombre: 'ed', apellido: 'ed', correo: '', telefono: 12345678},
    
]