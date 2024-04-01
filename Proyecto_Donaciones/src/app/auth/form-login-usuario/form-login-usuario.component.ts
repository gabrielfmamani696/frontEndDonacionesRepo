import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginUsuarioRequest } from '../../services/auth/loginUsuarioRequest';
//se importan las librerias 


@Component({
  selector: 'app-form-login-usuario',
  templateUrl: './form-login-usuario.component.html',
  styleUrl: './form-login-usuario.component.css'
})
export class FormLoginUsuarioComponent implements OnInit {
  // loginForm: FormGroup;
  loginError: string="";
  // loginForm esta enlazado al form de la vista mediante [formGroup]="loginForm" (ngSubmit) = "enviar()"
  // se crean los espacios password, con los validadores correspondientes y correo
  loginForm = this.fb.group({
    password: ['789654123', [Validators.required, Validators.minLength(3)]],
    correo: ['Royer@gmail.com', [Validators.required, Validators.email ]],
  })
  // tipodonacion: string = 'si'
  // tipodonacion?: string 

  //inyeccion formBuilder, rutas y el LoginService
  // LoginService en src\app\services\auth\login.service.ts
  // contiene los metodos con las rutas para realizar la conexion con BE
  constructor( private fb: FormBuilder, private router:Router, private LoginService: LoginService ){
  } 
  
  ngOnInit(): void {
    
  }


  //getters de los atributos del formulario
  get correo(){
    return this.loginForm.controls.correo
  }
  get password(){
    return this.loginForm.controls.password
  }

  // accion login, si el usuario es valido, se realizan varias acciones 
  //    next: acciones a continuacion de una correcta conexion 
  //    error: acciones a continuacion de una conexion incorrecta 
  //    complete: acciones a continuacion de una conexion completa 
  enviar(){
    if(this.loginForm.valid){
      // console.log(this.loginForm);
      // loginForm se envia con formato de  LoginUsuarioRequest
      this.LoginService.login(this.loginForm.value as LoginUsuarioRequest).subscribe({
        next: (userData) => {
          // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          //confirmacion
          console.log("login completo"); 
          //cuando una conexion se completa, se nos envia a la ruta: /datausuario
          this.router.navigateByUrl('/datausuario');
          //se vacian los datos del formulario
          this.loginForm.reset();
        }
      })
    }
    else{
      // linea para marcar los errores dentro del formulario
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos')
    }
    // console.log(this.tipodonacion);
  }
}
