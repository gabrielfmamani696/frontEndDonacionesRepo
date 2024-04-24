import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../services/auth/usuario';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { usuarioRechazadoInabilitadoPendiente } from '../../services/models/usuarioRechazadoInabilitadoPendiente';
import { solUsuarioVoluntario } from '../../services/models/solUsuarioVoluntario';
import { solUsuarioDonador } from '../../services/models/solUsuarioDonador';
import { usuariosHabilitados } from '../../services/models/usuariosHabilitados';
import { postulantesSubRolVolC } from '../../services/models/postulantesSubRolVol';
import { getAllPostulantesRolVolC } from '../../services/models/getAllPostulantesRolVol';

@Component({
  selector: 'app-pagina-admin',
  templateUrl: './pagina-admin.component.html',
  styleUrl: './pagina-admin.component.css',
})
export class PaginaAdminComponent implements OnInit {
  loginError: string = '';
  aceptarText: string = '';
  activeDataType: string = 'usuarios'; // Inicialmente, mostrar datos de usuarios
  postulantesSubRolVol: postulantesSubRolVolC[] = [];
  postulantesSubRolVolResp: postulantesSubRolVolC[] = [];
  postulantesSubRolVolColab: postulantesSubRolVolC[] = [];
  postulantesVol: getAllPostulantesRolVolC[] = [];
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
    // { id: 5, nombre: "xad", apellido: "Martínez", contrasena: "password789", confcontrasena: "password789", contenido: "<Nombre (Organizacion)>/<Tipo de Organizacion:>", telefono: 987654321 }
  ];

  usersRIP: usuarioRechazadoInabilitadoPendiente[] = [];
  solDonante: solUsuarioDonador[] = [];
  solReceptor: getAllPostulantesRolVolC[] = [];
  usuariosHabilitados: usuariosHabilitados[] = [];

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    // this.displaySolUsuarios();
    this.displaySolicitudUsuariosRIP();
    this.displayUsuariosHabilitados();
    this.displayGetAllPostulantesSubRolVol();
    this.displaySolDonante();
    this.urlGetPostAllReceptores();
    this.urlGetAllPostulantesRolVol();
  }
  // TODO necesito un token
  // TODO necesito un token
  // TODO necesito un token

  actualizarDisplay(seccion: string) {
    if (seccion === 'usuarios') {
      this.displaySolicitudUsuariosRIP();
      this.displayUsuariosHabilitados();
    } else if (seccion === 'donadores') {
      this.displaySolDonante();
    } else if (
      seccion === 'voluntarios_responsables' ||
      seccion === 'voluntarios_colaboradores'
    ) {
      this.displayGetAllPostulantesSubRolVol();
    } else if (seccion === 'voluntarios') {
      this.urlGetAllPostulantesRolVol();
    } else if (seccion === 'beneficiarios') {
      this.urlGetPostAllReceptores();
    }
  }
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

  displayUsuariosHabilitados() {
    this.loginService.tblUsuariosHabilitados().subscribe({
      next: (tblUsuariosHabilitados) => {
        this.usuariosHabilitados = tblUsuariosHabilitados;
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

  displaySolDonante() {
    this.loginService.tblDataSolDonante().subscribe({
      next: (tbl) => {
        this.solDonante = tbl;
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
  deshabUsuarioHabilitado(id: number) {
    // console.log('aceptado', id);
    this.loginService.userInhabilitar(id).subscribe({
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
  // acepta la solicitud
  aceptarSolUsuario(id: number) {
    // console.log('aceptado', id);
    this.loginService.userSolAceptar(id).subscribe({
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
        // console.log('usuario rechazado');
      },
    });
  }

  aceptarSolVol(id: number) {
    this.loginService.userVolSolAceptar(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }

  rechazarSolVol(id: number) {
    this.loginService.userVolSolRechazar(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }
  aceptarSolDonante(id: number) {
    this.loginService.userSolDonanteAceptar(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }

  rechazarSolDonante(id: number) {
    this.loginService.userSolDonanteRechazar(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
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

  buscarUsuarioPorCorreo(
    correo: string
  ): usuarioRechazadoInabilitadoPendiente | undefined {
    return this.usersRIP.find((usuario) => usuario.correo === correo);
  }

  imprimirUsuario(): void {
    const usuarioBuscado = this.buscarUsuarioPorCorreo('Lone@gmail.com');
    console.log(usuarioBuscado);
    console.log(usuarioBuscado?.correo);
    console.log(usuarioBuscado?.idUser);
    console.log(usuarioBuscado?.estado);
  }

  displayGetAllPostulantesSubRolVol() {
    this.loginService.displayGetAllPostulantesSubRolVol().subscribe({
      next: (pSRVdata) => {
        // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
        this.postulantesSubRolVol = pSRVdata;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.loginError = errorData;
      },
      complete: () => {
        //confirmacion
        // console.log('display completo', this.postulantesSubRolVol);
        console.log('display completo');
        //cuando una conexion se completa, se nos envia a la ruta: /datausuario
        // this.router.navigateByUrl('/datausuario');
        //se vacian los datos del formulario
        // this.loginForm.reset();
      },
    });

    setTimeout(() => {
      console.log(':D', this.postulantesSubRolVol);
      this.postulantesSubRolVolResp = this.postulantesSubRolVol.filter(
        (postulante) => postulante.subrol === 'Responsable'
      );
      this.postulantesSubRolVolColab = this.postulantesSubRolVol.filter(
        (postulante) => postulante.subrol === 'Colaborador'
      );
      console.log(':D', this.postulantesSubRolVolResp);
      console.log(':D', this.postulantesSubRolVolColab);
    }, 500);

    // console.log(':D',this.postulantesSubRolVolResp );
    // console.log(':D',this.postulantesSubRolVolColab );
  }

  aceptarPostulantesSubRolVol(id: number) {
    this.loginService.urlUserPostRolAcceptMessageUserVol(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }
  rechazarPostulantesSubRolVol(id: number) {
    this.urlUserPostRolRefusedMessageUserVol(id);
    // primero debe rechazarse el subrol
    setTimeout(() => {
      this.loginService.urlUserPostRolDeletteMessageUserVol(id).subscribe({
        next: (info) => {
          console.log('Aviso: ' + info);
        },
        error: (errorData) => {
          this.loginError = errorData;
        },
        complete: () => {
          // console.log('usuario rechazado');
        },
      });
    }, 250);
  }

  urlUserPostRolRefusedMessageUserVol(id: number) {
    // primero debe rechazarse el subrol

    this.loginService.urlUserPostRolRefusedMessageUserVol(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }

  urlGetAllPostulantesRolVol() {
    setTimeout(()=> {
      this.loginService.urlGetAllPostulantesRolVol().subscribe({
        next: (gaPRV) => {
          // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
          this.postulantesVol = gaPRV;
        },
        error: (errorData) => {
          // console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.log('display  postulantes vol completo');
        },
      });

    }, 100)
  }

  aceptarPostulantesVol(id: number) {
    this.loginService.urlAceptarPostulantesRolVol(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }
  rechazarPostulantesVol(id: number) {
    this.loginService.urlRechazarPostulantesRolVol(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }
  urlGetPostAllReceptores(){
    this.loginService.urlGetPostAllReceptores().subscribe({
      next: (solr) => {
        // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
        this.solReceptor = solr;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.loginError = errorData;
      },
      complete: () => {
        console.log('display  postulantes rec completo');
      },
    });    
  }
  aceptarSolReceptor(id: number){
    this.loginService.urlAceptarPostulantesRolVol(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }
  rechazarSolReceptor(id: number){
    this.loginService.urlRechazarPostulantesRolVol(id).subscribe({
      next: (info) => {
        console.log('Aviso: ' + info);
      },
      error: (errorData) => {
        this.loginError = errorData;
      },
      complete: () => {
        // console.log('usuario rechazado');
      },
    });
  }
}
