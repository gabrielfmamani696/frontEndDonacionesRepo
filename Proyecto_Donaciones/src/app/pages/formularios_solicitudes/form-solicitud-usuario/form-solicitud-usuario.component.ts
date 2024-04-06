import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { formSolUsuario } from '../../../services/auth/formSolUsuario';

@Component({
  selector: 'app-form-solicitud-usuario',
  templateUrl: './form-solicitud-usuario.component.html',
  styleUrl: './form-solicitud-usuario.component.css'
})
export class FormSolicitudUsuarioComponent {
  formularioSolicitudUsuario: FormGroup;
  tipodonacion: string = 'si';
  loginError: string = '';
  // tipodonacion?: string
  constructor(private form: FormBuilder, private router:Router, private loginService: LoginService) {
    this.formularioSolicitudUsuario = this.form.group({
      // ['<valormostrado>, [<validador1>,<validador1>]']
      nombre: ['Robert3', Validators.required],
      apellido: ['migo3', Validators.required],
      password: ['15354ler3', [Validators.required, Validators.minLength(3)]],
      // conf_contrasena: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['minio3@minion.com', [Validators.required, Validators.email]],
      telefono: ['15983283', [Validators.required]],
    });
  }
  enviarFormSolUsuario() {
    if(this.formularioSolicitudUsuario.valid){
      this.loginService.registroUsuario(this.formularioSolicitudUsuario.value as formSolUsuario).subscribe({
        error: (errorData) => {
          console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          //confirmacion
          // console.log("login completo");
          alert("Envio de datos completo") 
          this.router.navigateByUrl('/');
          this.formularioSolicitudUsuario.reset();
        }
      })
    }
  }
}
