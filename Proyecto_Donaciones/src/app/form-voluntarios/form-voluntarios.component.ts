import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-voluntarios',
  templateUrl: './form-voluntarios.component.html',
  styleUrl: './form-voluntarios.component.css'
})
export class FormVoluntariosComponent {

  formularioVoluntario: FormGroup;

  constructor( private form: FormBuilder ){
    this.formularioVoluntario = this.form.group({
      // ['<valormostrado>, [<validador1>,<validador1>]']
      nombre: ['', Validators.required],
      apellido: ['', Validators.required], 
      contrasena: ['', [Validators.required, Validators.minLength(3)]],
      conf_contrasena: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email ]],
      telefono: ['', [Validators.required]],
      horario: ['', Validators.required],
      turno: ['', Validators.required],
      edad: ['',Validators.required] ,
    })
  } 
  
  enviar(){
    console.log(this.formularioVoluntario);
  }

  // shift alt a
  // este codigo era para el formulario plantilla
  /* 
  public voluntario: any = {
    nombre: '',
    apellido: '',
    contrasena: '',
    conf_contrasena: '',
    correo: '',
    telefono: 0,
    horario: '',
    turno: '',
    edad: 0,
  }

  enviar(){
    console.log(this.voluntario);
  }
 */
}
