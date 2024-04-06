import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginUsuarioRequest } from '../../services/auth/loginUsuarioRequest';
import { Usuario } from '../../services/auth/usuario';
//se importan las librerias 


@Component({
  selector: 'app-form-login-usuario',
  templateUrl: './form-login-usuario.component.html',
  styleUrl: './form-login-usuario.component.css',
})
export class FormLoginUsuarioComponent implements OnInit {
  // loginForm: FormGroup;
  currentUser?: Usuario;
  loginError: string = '';
  // loginForm esta enlazado al form de la vista mediante [formGroup]="loginForm" (ngSubmit) = "enviar()"
  // se crean los espacios password, con los validadores correspondientes y correo
  loginForm = this.fb.group({
    password: ['651984', [Validators.required, Validators.minLength(3)]],
    correo: ['Londres@gmail.com', [Validators.required, Validators.email]],
  });
  // tipodonacion: string = 'si'
  // tipodonacion?: string

  //inyeccion formBuilder, rutas y el LoginService
  // LoginService en src\app\services\auth\login.service.ts
  // contiene los metodos con las rutas para realizar la conexion con BE
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  //getters de los atributos del formulario
  get correo() {
    return this.loginForm.controls.correo;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  // accion login, si el usuario es valido, se realizan varias acciones
  //    next: acciones a continuacion de una correcta conexion
  //    error: acciones a continuacion de una conexion incorrecta
  //    complete: acciones a continuacion de una conexion completa
  enviarLoginUsuario() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm);
      // loginForm se envia con formato de  LoginUsuarioRequest
      this.loginService
        .login(this.loginForm.value as LoginUsuarioRequest)
        .subscribe({
          next: (userData) => {
            // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
            this.currentUser = userData;
            // console.log(this.currentUser?.id); //este dato deberia manejarse en otros componentes
            // sessionStorage.setItem('rol', 'usuario');
          },
          error: (errorData) => {
            console.log(errorData);
            this.loginError = errorData;
          },
          complete: () => {
            //confirmacion
            console.log('login completo');
            //cuando una conexion se completa, se nos envia a la ruta: /datausuario
            this.router.navigateByUrl('/datausuario');
            //se vacian los datos del formulario
            this.loginForm.reset();
          },
        });
    } else {
      // linea para marcar los errores dentro del formulario
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos');
    }
    // console.log(this.tipodonacion);
  }

  enviarGral() {
    if (this.loginForm.value.correo === 'admin@admin.com') {
      // console.log(this.loginForm.value.correo);
      // la funcion se activa con este boton
      // sessionStorage.setItem('rol', 'admin');
      this.loginService.adminRol();
      this.loginService.loginAdmin();
      // this.enviarLoginUsuario();
      if (this.loginForm.valid) {
        // console.log(this.loginForm);
        // loginForm se envia con formato de  LoginUsuarioRequest
        this.loginService
          .login(this.loginForm.value as LoginUsuarioRequest)
          .subscribe({
            next: (userData) => {
              // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
              this.currentUser = userData;
              // console.log(this.currentUser?.id); //este dato deberia manejarse en otros componentes
              // sessionStorage.setItem('rol', 'usuario');
            },
            error: (errorData) => {
              console.log(errorData);
              this.loginError = errorData;
            },
            complete: () => {
              //confirmacion
              console.log('login completo');
              //cuando una conexion se completa, se nos envia a la ruta: /datausuario
              this.router.navigateByUrl('/adminpage');
              //se vacian los datos del formulario
              this.loginForm.reset();
            },
          });
      } else {
        // linea para marcar los errores dentro del formulario
        this.loginForm.markAllAsTouched();
        alert('Error al ingresar los datos');
      }
    } else {
      this.enviarLoginUsuario();
    }
  }
}
