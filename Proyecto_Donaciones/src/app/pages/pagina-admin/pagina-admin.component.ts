import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../services/auth/usuario';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.css'
})
export class PaginaAdminComponent implements OnInit {
  loginError: string = '';
  activeDataType: string = 'usuarios'; // Inicialmente, mostrar datos de usuarios

  // lista deberia ser vacia y llenarse con el metodo correspondiente
  solDeUsuarios: Usuario[] = [
    { id: 1, nombre: "Juan", apellido: "Pérez", contrasena: "contraseña123", confcontrasena: "contraseña123", correo: "juan@example.com", telefono: 123456789 },
    { id: 2, nombre: "María", apellido: "Gómez", contrasena: "clave456", confcontrasena: "clave456", correo: "maria@example.com", telefono: 987654321 },
    { id: 3, nombre: "Pedro", apellido: "Martínez", contrasena: "password789", confcontrasena: "password789", correo: "pedro@example.com", telefono: 987654321 },
    { id: 4, nombre: "xad", apellido: "Martínez", contrasena: "password789", confcontrasena: "password789", correo: "xad@example.com", telefono: 987654321 }
    // { id: 5, nombre: "xad", apellido: "Martínez", contrasena: "password789", confcontrasena: "password789", contenido: "<Nombre (Organizacion)>/<Tipo de Organizacion:>", telefono: 987654321 }
  ];


  constructor( private router:Router, private loginService: LoginService) { }
  
  ngOnInit(): void {
    // this.displaySolUsuarios();
  }

  displaySolUsuarios(){
    this.loginService.solicitudesUsuario().subscribe({
      next: (usuariosData) => {
        // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
        this.solDeUsuarios=usuariosData;
      },
      error: (errorData) => {
        console.log(errorData);
        this.loginError = errorData;
      },
      complete: () => {
        //confirmacion
        console.log("login completo"); 
        //cuando una conexion se completa, se nos envia a la ruta: /datausuario
        // this.router.navigateByUrl('/datausuario');
        //se vacian los datos del formulario
        // this.loginForm.reset();
      }
    })
  }

  cambiarTipoDatos(tipo: string) {
    this.activeDataType = tipo;
  }
  
  
  // acepta la solicitud
  aceptar(id: number){
    console.log('aceptado', id);
  }


  // denega y borra la solicitud
  denegar(id: number){
    console.log('denegado', id);
  }
}
