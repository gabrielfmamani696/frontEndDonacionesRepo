import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../services/auth/usuario';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { usuarioRechazadoInabilitadoPendiente } from '../../services/models/usuarioRechazadoInabilitadoPendiente';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.css',
})
export class PaginaAdminComponent implements OnInit {
  loginError: string = '';
  aceptarText: string = '';
  activeDataType: string = 'usuarios'; // Inicialmente, mostrar datos de usuarios

  // lista deberia ser vacia y llenarse con el metodo correspondiente
  solDeUsuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      contrasena: 'contraseña123',
      correo: 'juan@example.com',
      telefono: 123456789,
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'Gómez',
      contrasena: 'clave456',
      correo: 'maria@example.com',
      telefono: 987654321,
    },
    {
      id: 3,
      nombre: 'Pedro',
      apellido: 'Martínez',
      contrasena: 'password789',
      correo: 'pedro@example.com',
      telefono: 987654321,
    },
    {
      id: 4,
      nombre: 'xad',
      apellido: 'Martínez',
      contrasena: 'password789',
      correo: 'xad@example.com',
      telefono: 987654321,
    },
    // { id: 5, nombre: "xad", apellido: "Martínez", contrasena: "password789", confcontrasena: "password789", contenido: "<Nombre (Organizacion)>/<Tipo de Organizacion:>", telefono: 987654321 }
  ];

  usersRIP: usuarioRechazadoInabilitadoPendiente[] = [];

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    // this.displaySolUsuarios();
    this.displaySolicitudUsuariosRIP();
  }
  // TODO necesito un token
  // TODO necesito un token
  // TODO necesito un token
  // TODO necesito un token
  // TODO necesito un token
  displaySolicitudUsuariosRIP() {
    this.loginService.allUsuarioRechazadoInabilitadoPendiente().subscribe({
      next: (usersRIP_data) => {
        this.usersRIP = usersRIP_data;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.loginError = errorData;
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }

  displaySolUsuarios() {
    this.loginService.solicitudesUsuario().subscribe({
      next: (usuariosData) => {
        // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
        this.solDeUsuarios = usuariosData;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.loginError = errorData;
      },
      complete: () => {
        //confirmacion
        console.log('login completo');
        //cuando una conexion se completa, se nos envia a la ruta: /datausuario
        // this.router.navigateByUrl('/datausuario');
        //se vacian los datos del formulario
        // this.loginForm.reset();
      },
    });
  }

  cambiarTipoDatos(tipo: string) {
    this.activeDataType = tipo;
  }

  //
  mensajeAceptado?: string;
  // acepta la solicitud
  aceptar(id: number) {
    // console.log('aceptado', id);
    this.loginService.userAceptar(id).subscribe({
      next: (info) => {
        this.aceptarText = info;
        console.log('Aviso: ' + this.aceptarText);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        console.log('usuario aceptado');
      },
    });
    // this.displaySolicitudUsuariosRIP();
  }

  // denega y borra la solicitud
  rechazarSolUsuario(id: number) {
    this.loginService.userSolRechazar(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        console.log('usuario rechazado');
      },
    });
  }

  // usuarioBuscado?: Usuario;

  // buscarUsuarioPorCorreo(correo: string): void  {

  //   this.usuarioBuscado = this.solDeUsuarios.find(usuario => usuario.correo === correo);
  // }

  // imprimirUsuario(): void {
  //   this.buscarUsuarioPorCorreo('Lon@gai.com')
  //   // this.usuarioBuscado = this.buscarUsuarioPorCorreo('Lon@gai.com')
  //   console.log(this.usuarioBuscado);
  // }

  buscarUsuarioPorCorreo(correo: string): usuarioRechazadoInabilitadoPendiente | undefined {
    return this.usersRIP.find((usuario) => usuario.correo === correo);
  }

  imprimirUsuario(): void {
    const usuarioBuscado = this.buscarUsuarioPorCorreo('Lone@gmail.com');
    console.log(usuarioBuscado);
    console.log(usuarioBuscado?.correo);
    console.log(usuarioBuscado?.id);
    console.log(usuarioBuscado?.estado);
  }
}
