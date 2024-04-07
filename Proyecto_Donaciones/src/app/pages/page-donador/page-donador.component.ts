import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { formDonacion } from '../../services/models/formDonacion';
import { formAlimento } from '../../services/models/formAlimento';
import { formProducto } from '../../services/models/formProducto';

@Component({
  selector: 'app-page-donador',
  templateUrl: './page-donador.component.html',
  styleUrl: './page-donador.component.css',
})
export class PageDonadorComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}
  tipodonacion: string = '';
  donacionForm = this.fb.group({
    cantidad: [0, [Validators.required]],
    fecha_hora: ['', [Validators.required]],
    tipo_ap: [''],
  });
  donacionAlimentoForm = this.fb.group({
    fechaVenc: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    cantidad: [0, [Validators.required]],
  });
  donacionProductoForm = this.fb.group({
    estado: ['', [Validators.required]],
    cantidad: [0, [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  actualizarTipoDonacion(tipodon: string) {
    this.tipodonacion = tipodon;
    // this.donacionForm.patchValue({
    //   tipo_ap: tipodon,
    // });
  }

  enviarFormDonacion() {
    // if (this.donacionForm.valid) {
    //   console.log('valid?: ', this.donacionForm.valid);
    //   console.log('Detalles de la donacion', this.donacionForm.value.cantidad);
    //   // console.log('Detalles de la donacion', this.donacionForm.value.tipo_ap);
    //   console.log('Detalles de los Alimentos', this.donacionAlimentoForm.value.fechaVenc);
    //   console.log('Detalles de los Productos', this.donacionProductoForm.value.cantidad);
    // }
    console.log(this.donacionForm.value);

    this.loginService.registroDonacion(this.donacionForm.value as formDonacion).subscribe({
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        // this.router.navigateByUrl('/');
        this.donacionForm.reset();
      }
    })
  }

  enviarFormAlimento() {
    console.log(this.donacionAlimentoForm.value);
    this.loginService.registroAlimento(this.donacionAlimentoForm.value as formAlimento).subscribe({
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        // this.router.navigateByUrl('/');
        this.donacionAlimentoForm.reset();
      }
    })
  }

  enviarFormProducto() {
    console.log(this.donacionProductoForm.value);
    this.loginService.registroProducto(this.donacionProductoForm.value as formProducto).subscribe({
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        // this.router.navigateByUrl('/');
        this.donacionProductoForm.reset();
      }
    })
  }

  enviar() {
    if (this.tipodonacion === 'Alimento') {
      if (this.donacionForm.valid && this.donacionAlimentoForm.valid) {
        this.enviarFormDonacion();
        this.enviarFormAlimento();
        console.log('es correcto');
        
      } else {
        this.donacionForm.markAllAsTouched();
        this.donacionAlimentoForm.markAllAsTouched();
        alert('Error al ingresar los datos');
      }
    } else {
      if (this.donacionForm.valid && this.donacionProductoForm.valid) {
        this.enviarFormDonacion();
        this.enviarFormProducto();
        console.log('es correcto');
        
      } else {
        this.donacionForm.markAllAsTouched();
        this.donacionProductoForm.markAllAsTouched();
        alert('Error al ingresar los datos');
      }
    }
  }
}
