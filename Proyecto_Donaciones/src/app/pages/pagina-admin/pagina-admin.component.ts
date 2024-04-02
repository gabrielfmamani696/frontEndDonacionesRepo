import { Component } from '@angular/core';
import { Usuario } from '../../services/auth/usuario';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.css'
})
export class PaginaAdminComponent {
  activeDataType: string = 'usuarios'; // Inicialmente, mostrar datos de usuarios
  // lista deberia ser vacia y llenarse con el metodo correspondiente
  listaDeUsuarios: Usuario[] = [
    {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        contrasena: "contraseña123",
        confcontrasena: "contraseña123",
        correo: "juan@example.com",
        telefono: 123456789
    },
    {
        id: 2,
        nombre: "María",
        apellido: "Gómez",
        contrasena: "clave456",
        confcontrasena: "clave456",
        correo: "maria@example.com",
        telefono: 987654321
    },
    {
        id: 3,
        nombre: "Pedro",
        apellido: "Martínez",
        contrasena: "password789",
        confcontrasena: "password789",
        correo: "pedro@example.com",
        telefono: 987654321
    },
    {
      id: 4,
      nombre: "xad",
      apellido: "Martínez",
      contrasena: "password789",
      confcontrasena: "password789",
      correo: "xad@example.com",
      telefono: 987654321
    }
];
  // constructor() { }

  cambiarTipoDatos(tipo: string) {
    this.activeDataType = tipo;
  }
  
  
// acepta la solicitus
  aceptar(id: number){
    console.log('aceptado', id);
    
  }
  // denega y borra la solicitud
  denegar(id: number){
    console.log('denegado', id);
  }



  // llamado al metodo de service 
  
}
