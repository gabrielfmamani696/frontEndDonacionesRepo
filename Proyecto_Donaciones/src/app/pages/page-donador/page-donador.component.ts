import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { formDonacion } from '../../services/models/formDonacion';
import { formAlimento } from '../../services/models/formAlimento';
import { formProducto } from '../../services/models/formProducto';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';

@Component({
  selector: 'app-page-donador',
  templateUrl: './page-donador.component.html',
  styleUrl: './page-donador.component.css',
})
export class PageDonadorComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();

  ngOnInit(): void {
    this.currentUsuarioSimpleData =
      this.loginService.getCurrentUsuarioSimpleData();
    console.log(this.currentUsuarioSimpleData.correo);
  }
  tipodonacion: string = '';
  donacionForm = this.fb.group({
    correo: [''],
    cantidad: [0, [Validators.required]],
    fechaHoraRecogida: ['', [Validators.required]],
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
    this.currentUsuarioSimpleData = this.loginService.getCurrentUsuarioSimpleData();

    const fechaObjeto = new Date(
      this.donacionForm.value.fechaHoraRecogida as string
    );

    // Obtener los componentes de la fecha
    const dia = fechaObjeto.getDate().toString().padStart(2, '0'); // Día con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0'); // Mes comienza desde 0, por lo que se suma 1 (padStart se utiliza para agregar un cero inicial si es necesario)
    const anio = fechaObjeto.getFullYear();
    const horas = fechaObjeto.getHours().toString().padStart(2, '0'); // Horas con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)
    const minutos = fechaObjeto.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)

    // Construir la cadena de fecha en el formato deseado
    const fechaTransformada = `${dia}/${mes}/${anio}/${horas}/${minutos}`;
    // console.log(this.donacionForm.value.fecha_hora);
    // console.log(this.currentUsuarioSimpleData.correo);
    this.donacionForm.patchValue({
      correo: this.currentUsuarioSimpleData.correo,
      fechaHoraRecogida: fechaTransformada,
    });

    // console.log(this.donacionForm.value);
    setTimeout(() => {
      if(this.currentUsuarioSimpleData.rol === 'Donador'){
        this.loginService
        .registroDonacion(this.donacionForm.value as formDonacion)
        .subscribe({
          error: (errorData) => {
            console.log(errorData);
          },
          complete: () => {
            // this.router.navigateByUrl('/');
            this.donacionForm.reset();
          },
        });
      } else {
        alert('Usted NO es un usuario DONADOR')
      }
    }, 200);
    
  }

  enviarFormAlimento() {
    const fechaObjeto = new Date(
      this.donacionAlimentoForm.value.fechaVenc as string
    );

    // Obtener los componentes de la fecha
    const dia = fechaObjeto.getDate().toString().padStart(2, '0'); // Día con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0'); // Mes comienza desde 0, por lo que se suma 1 (padStart se utiliza para agregar un cero inicial si es necesario)
    const anio = fechaObjeto.getFullYear();

    // Construir la cadena de fecha en el formato deseado
    const fechaTransformada = `${dia}/${mes}/${anio}`;
    // console.log(this.donacionForm.value.fecha_hora);
    // console.log(this.currentUsuarioSimpleData.correo);
    this.donacionAlimentoForm.patchValue({
      fechaVenc: fechaTransformada,
    });
    console.log(this.donacionAlimentoForm.value);
    this.loginService
      .registroAlimento(this.donacionAlimentoForm.value as formAlimento)
      .subscribe({
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          // this.router.navigateByUrl('/');
          this.donacionAlimentoForm.reset();
        },
      });
  }

  enviarFormProducto() {
    console.log(this.donacionProductoForm.value);
    this.loginService
      .registroProducto(this.donacionProductoForm.value as formProducto)
      .subscribe({
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          // this.router.navigateByUrl('/');
          this.donacionProductoForm.reset();
        },
      });
  }

  enviar() {
    // LOGRO
    // if (this.tipodonacion === 'Alimento') {
    //   if (this.donacionForm.valid && this.donacionAlimentoForm.valid) {
    //     this.enviarFormDonacion();
    //     this.enviarFormAlimento();
    //     console.log('es correcto');
    //   } else {
    //     this.donacionForm.markAllAsTouched();
    //     this.donacionAlimentoForm.markAllAsTouched();
    //     alert('Error al ingresar los datos');
    //   }
    // } else {
    //   if (this.donacionForm.valid && this.donacionProductoForm.valid) {
    //     this.enviarFormDonacion();
    //     this.enviarFormProducto();
    //     console.log('es correcto');
    //   } else {
    //     this.donacionForm.markAllAsTouched();
    //     this.donacionProductoForm.markAllAsTouched();
    //     alert('Error al ingresar los datos');
    //   }
    // }

    if (this.donacionForm.valid){
      this.enviarFormDonacion();
    } else {
      this.donacionForm.markAllAsTouched();
      alert('Error al ingresar los datos');
    }
  }
}
