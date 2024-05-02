import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { formSolUsuario } from '../../../services/auth/formSolUsuario';
import { UsuarioActualService } from '../../../services/share/usuario-actual.service';
import { Usuario } from '../../../services/auth/usuario';
import { Usuario2 } from '../../../services/auth/usuario2';

@Component({
  selector: 'app-form-solicitud-usuario',
  templateUrl: './form-solicitud-usuario.component.html',
  styleUrl: './form-solicitud-usuario.component.css'
})
export class FormSolicitudUsuarioComponent {
  // usuarioActualmenteActivo: Usuario = {
  //   id: 0,
  //   nombre: '',
  //   apellido: '',
  //   contrasena: '',
  //   confcontrasena: '',
  //   correo: '',
  //   telefono: 0,
  // };
  usuarioActualmenteActivo?: Usuario2;
  formularioSolicitudUsuario: FormGroup;
  tipodonacion: string = 'si';
  loginError: string = '';
  // tipodonacion?: string
  constructor(private form: FormBuilder, private router:Router, private loginService: LoginService, private userDataShare: UsuarioActualService) {
    this.formularioSolicitudUsuario = this.form.group({
      // ['<valormostrado>, [<validador1>,<validador1>]']
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      // conf_contrasena: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
    });
  }
  enviarFormSolUsuario() {
    // this.usuarioActualmenteActivo = this.formularioSolicitudUsuario as Usuario2;
    this.usuarioActualmenteActivo = {
      // id?: number;
      nombre: this.formularioSolicitudUsuario.value.nombre,
      apellido: this.formularioSolicitudUsuario.value.apellido,
      // password?: this.formularioSolicitudUsuario.value.nombre,
      correo: this.formularioSolicitudUsuario.value.correo,
      telefono: this.formularioSolicitudUsuario.value.telefono,
      // ubicacion?: this.formularioSolicitudUsuario.value.nombre,
      // estado?: this.formularioSolicitudUsuario.value.nombre,
    }
    this.userDataShare.setUsuarioActualmenteActivo(this.usuarioActualmenteActivo);



    if(this.formularioSolicitudUsuario.valid){
      this.loginService.registroUsuario(this.formularioSolicitudUsuario.value as formSolUsuario).subscribe({
        error: (errorData) => {
          console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          alert("Envío de datos completado");
          this.router.navigateByUrl('/');
          this.formularioSolicitudUsuario.reset();
        }
      })
    }
  }
}
