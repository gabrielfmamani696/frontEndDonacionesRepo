import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { formDonacion } from '../../services/models/formDonacion';
import { formAlimento } from '../../services/models/formAlimento';
import { formProducto } from '../../services/models/formProducto';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';
import { newProducto } from '../../services/models/newProducto';

@Component({
  selector: 'app-page-donador',
  templateUrl: './page-donador.component.html',
  styleUrl: './page-donador.component.css',
})
export class PageDonadorComponent implements OnInit {
  nombreProducto: string = '';
  sumaProd: number = 0;
  concat: string = '';
  newProductos: newProducto[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
  
  nuevaPosicion: google.maps.LatLngLiteral = { lat: -16.504912732916537, lng: -68.12993288040161 };
  markerPositions: google.maps.LatLngLiteral[] = [];
  ngOnInit(): void {
    this.markerPositions.push(this.nuevaPosicion);
    // this.newProductos.push({nombre: 'Manzanas', cantidad: 10});
    // this.newProductos.push({nombre: 'Peras', cantidad: 10});
    // this.newProductos[1].cantidad+=1;
    // console.log(this.newProductos[0]);
    // console.log(this.newProductos[1]);

    this.currentUsuarioSimpleData =
      this.loginService.getCurrentUsuarioSimpleData();
    console.log(this.currentUsuarioSimpleData.correo);
  }
  tipodonacion: string = '';
  donacionForm = this.fb.group({
    correo: [''],
    cantidad: [0, [Validators.required]],
    // cantidad: [0, [Validators.required]],
    fechaHoraRecogida: ['', [Validators.required]],
    tipo_ap: [''],
    ubicacion: [''],
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
  }

  enviarFormDonacion() {
    this.currentUsuarioSimpleData =
      this.loginService.getCurrentUsuarioSimpleData();

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
    // if(this.donacionForm.valid){
      this.donacionForm.patchValue({
        correo: this.currentUsuarioSimpleData.correo,
        fechaHoraRecogida: fechaTransformada,
        tipo_ap: this.concat,
        cantidad: this.sumaProd,
        ubicacion: `${this.markerPositions[0].lat},${this.markerPositions[0].lng}`
      });
      console.log(this.donacionForm);
      // console.log(this.donacionForm.value);
      setTimeout(() => {
        if (this.currentUsuarioSimpleData.rol === 'Donante') {
          this.loginService
            .registroDonacion(this.donacionForm.value as formDonacion)
            .subscribe({
              error: (errorData) => {
                console.log(errorData);
              },
              complete: () => {
                // this.router.navigateByUrl('/');
                this.donacionForm.reset();
                alert('Donación realizada');
              },
            });
        } else {
          alert('Usted NO es un usuario Donante');
        }
      }, 200);
    // } else {
    //   this.donacionForm.markAllAsTouched();
    //   alert('Error al ingresar los datos');
    // }
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

    if (this.donacionForm.valid) {
      this.enviarFormDonacion();
    } else {
      this.donacionForm.markAllAsTouched();
      alert('Error al ingresar los datos');
    }
  }

  agregarProducto(nombre: string) {
    const index = this.newProductos.findIndex(
      (producto) => producto.nombre === nombre
    );

    if (index !== -1) {
      // El producto ya existe, aumentamos su cantidad
      this.newProductos[index].cantidad += 1;
    }
    // else {
    //   // El producto no existe, lo agregamos al array
    //   this.newProductos.push({ nombre, cantidad });
    // }
    console.log(this.newProductos);
  }
  reducirProducto(nombre: string) {
    const index = this.newProductos.findIndex(
      (producto) => producto.nombre === nombre
    );

    if (index !== -1) {
      // El producto ya existe, aumentamos su cantidad
      this.newProductos[index].cantidad -= 1;
    }
    // else {
    //   // El producto no existe, lo agregamos al array
    //   let nxtVal = this.newProductos.values.can
    //   this.newProductos.push({ nombre, thi });
    // }
    console.log(this.newProductos);
  }

  anadirProducto() {
    this.newProductos.push({ nombre: this.nombreProducto, cantidad: 0 });
    this.nombreProducto = '';
  }
  noenviar() {
    this.newProductos = [];
    this.sumaProd = 0;
    this.donacionForm.reset();
  }
  concatenar() {
    this.concat = '';
    this.sumaProd = 0;
    for (let i = 0; i < this.newProductos.length; i++) {
      const producto = this.newProductos[i];

      // Validación para no considerar productos con cantidad <= 0
      if (producto.cantidad > 0) {
        this.concat += `${producto.cantidad}${producto.nombre},`;
        this.sumaProd += producto.cantidad;
      }
    }

    // Eliminar la última coma de la concatenación si es necesario
    if (this.concat.endsWith(',')) {
      this.concat = this.concat.slice(0, -1); // Elimina la última coma
    }

    console.log('Suma total de productos:', this.sumaProd);
    console.log('Productos:', this.concat);
  }
  prueba() {
    this.concatenar();
    this.enviarFormDonacion();
    setTimeout(() => {
      this.noenviar(); //limpiar
    }, 500);
  }

  label = {
    color: 'red',
    text: 'Marcador',
  };

  center: google.maps.LatLngLiteral = {
    lat: -16.504912732916537,
    lng: -68.12993288040161,
  };
  zoom = 17;
  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false
  }
  addmarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions[0]= event.latLng.toJSON();
    };
    console.log(this.markerPositions[0].lat, this.markerPositions[0].lng);
  }

}
