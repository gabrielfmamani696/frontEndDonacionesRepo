import { Component } from '@angular/core';
import { Alimento } from '../../services/models/alimento';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { Producto } from '../../services/models/producto';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-beneficiario',
  templateUrl: './page-beneficiario.component.html',
  styleUrl: './page-beneficiario.component.css',
})
export class PageBeneficiarioComponent {
  arrayObjetosAli: number[] = [];
  arrayObjetosProd: number[] = [];
  alimentos: Alimento[] = [];
  productos: Producto[] = [];
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
  formBenefAlimento = this.fb.group({
    fechaHoraProgramada: ['', [Validators.required]],
    ubicacion: [''],
  });
  contConcatAli: string = '';
  contConcatProd: string = '';
  contConcatCompleto: string = '';
  suma: number = 0;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}
  nuevaPosicion: google.maps.LatLngLiteral = {
    lat: -16.504912732916537,
    lng: -68.12993288040161,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  ngOnInit(): void {
    this.currentUsuarioSimpleData =
      this.loginService.getCurrentUsuarioSimpleData();
    this.display();
  }

  urlGetAllAlimentos() {
    this.loginService.urlGetAllAlimentos().subscribe({
      next: (data) => {
        this.alimentos = data;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.alimentos = errorData;
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }
  urlGetAllProductos() {
    this.loginService.urlGetAllProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (errorData) => {
        // console.log(errorData);
        this.alimentos = errorData;
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }

  display() {
    this.urlGetAllAlimentos();
    this.urlGetAllProductos();
    // this.concatenarContenido();
  }

  agregarAlimento(id: number, cantidad: number) {
    if (!this.arrayObjetosAli[id]) {
      // Si el objeto en esta posición no ha sido asignado aún, inicialízalo como un objeto con la propiedad 'cantidad' igual a 0
      this.arrayObjetosAli[id] = 0;
    }
    if (cantidad > this.arrayObjetosAli[id]) {
      this.arrayObjetosAli[id] += 1;
    }
  }
  dejarAlimento(id: number, cantidad: number) {
    if (!this.arrayObjetosAli[id]) {
      // Si el objeto en esta posición no ha sido asignado aún, inicialízalo como un objeto con la propiedad 'cantidad' igual a 0
      this.arrayObjetosAli[id] = 0;
    }
    this.arrayObjetosAli[id] -= 1;
  }
  agregarProducto(id: number, cantidad: number) {
    if (!this.arrayObjetosProd[id]) {
      // Si el objeto en esta posición no ha sido asignado aún, inicialízalo como un objeto con la propiedad 'cantidad' igual a 0
      this.arrayObjetosProd[id] = 0;
    }
    if (cantidad > this.arrayObjetosProd[id]) {
      this.arrayObjetosProd[id] += 1;
    }
  }
  dejarProducto(id: number, cantidad: number) {
    if (!this.arrayObjetosProd[id]) {
      // Si el objeto en esta posición no ha sido asignado aún, inicialízalo como un objeto con la propiedad 'cantidad' igual a 0
      this.arrayObjetosProd[id] = 0;
    }
    this.arrayObjetosProd[id] -= 1;
  }

  concatenarContenidoProd(): void {
    this.contConcatAli = '';
    for (let i = 0; i < this.arrayObjetosAli.length; i++) {
      if (
        this.arrayObjetosAli[i] !== undefined &&
        this.arrayObjetosAli[i] !== null
      ) {
        let alimento: string = this.alimentos.find((a) => a.idAlimento === i)
          ?.tipo as string;
        if (this.arrayObjetosAli[i] > 0) {
          this.contConcatAli +=
            this.arrayObjetosAli[i].toString() + alimento + ',';
          this.suma += this.arrayObjetosAli[i];
        }
      }
    }
    // Elimina la coma al final
    this.contConcatAli = this.contConcatAli.slice(0, -1);

    console.log(this.contConcatAli, '\n', this.suma);
  }
  concatenarContenidoAli(): void {
    this.contConcatAli = '';
    for (let i = 0; i < this.arrayObjetosAli.length; i++) {
      if (
        this.arrayObjetosAli[i] !== undefined &&
        this.arrayObjetosAli[i] !== null
      ) {
        let alimento: string = this.alimentos.find((a) => a.idAlimento === i)
          ?.tipo as string;
        if (this.arrayObjetosAli[i] > 0) {
          this.contConcatAli +=
            this.arrayObjetosAli[i].toString() + alimento + ',';
          this.suma += this.arrayObjetosAli[i];
        }
      }
    }

    console.log(this.contConcatAli, '\n', this.suma);
    this.contConcatProd = '';
    for (let i = 0; i < this.arrayObjetosProd.length; i++) {
      if (
        this.arrayObjetosProd[i] !== undefined &&
        this.arrayObjetosProd[i] !== null
      ) {
        let producto: string = this.productos.find((a) => a.idProducto === i)
          ?.tipo as string;
        if (this.arrayObjetosProd[i] > 0) {
          this.contConcatAli +=
            this.arrayObjetosProd[i].toString() + producto + ',';
          this.suma += this.arrayObjetosProd[i];
        }
      }
    }
    console.log(this.contConcatProd, '\n', this.suma);

    if (this.contConcatAli === '' && this.contConcatProd !== '') {
      // contConcatAli esta vacio
      this.contConcatProd = this.contConcatProd.slice(0, -1); // se elimina la ultima , de contConcatProd
      this.contConcatCompleto = this.contConcatProd;
    } else if (this.contConcatAli !== '' && this.contConcatProd === '') {
      this.contConcatAli = this.contConcatAli.slice(0, -1); // se elimina la ultima , de contConcatProd
      this.contConcatCompleto = this.contConcatAli;
    } else if (this.contConcatAli !== '' && this.contConcatProd !== '') {
      this.contConcatProd = this.contConcatProd.slice(0, -1); // se elimina la ultima , de contConcatProd
      this.contConcatAli = this.contConcatAli.slice(0, -1); // se elimina la ultima , de contConcatProd
      this.contConcatCompleto = this.contConcatProd + this.contConcatAli;
    }
  }

  enviarFormBenefAlimento() {
    if (this.currentUsuarioSimpleData.rol === 'Receptor') {
      this.suma = 0;
      this.concatenarContenidoAli();
      const fechaObjeto = new Date(
        this.formBenefAlimento.value.fechaHoraProgramada as string
      );

      // Obtener los componentes de la fecha
      const dia = fechaObjeto.getDate().toString().padStart(2, '0'); // Día con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)
      const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0'); // Mes comienza desde 0, por lo que se suma 1 (padStart se utiliza para agregar un cero inicial si es necesario)
      const anio = fechaObjeto.getFullYear();
      const horas = fechaObjeto.getHours().toString().padStart(2, '0'); // Horas con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)
      const minutos = fechaObjeto.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos (padStart se utiliza para agregar un cero inicial si es necesario)

      // Construir la cadena de fecha en el formato deseado
      const fechaTransformada = `${dia}/${mes}/${anio}/${horas}/${minutos}`;
      let ubi: string = `${this.markerPositions[0].lat},${this.markerPositions[0].lng}`;
      if (this.formBenefAlimento.valid) {
        if (this.suma > 0) {
          console.log(
            this.currentUsuarioSimpleData.correo,
            '\n',
            this.suma,
            '\n',
            this.contConcatCompleto,
            fechaTransformada,
            ubi
          );
          this.loginService
            .urlRealizarSolicitudBene(
              this.currentUsuarioSimpleData.correo,
              this.suma,
              this.contConcatCompleto,
              fechaTransformada,
              ubi
            )
            .subscribe({
              next: (salida) => {
                console.log('salida: ', salida);
                this.formBenefAlimento.reset();
                this.arrayObjetosAli = [];
                this.arrayObjetosProd = [];
                alert('Su solicitud ha sido enviada.');
              },
            });
          setTimeout(() => {
            this.display();
          }, 100);
        } else {
          alert('Debe elegir un producto antes de enviar.');
        }
      } else {
        alert('No olvide agregar la fecha de envio');
      }
    } else {
      alert('Usted no es un Usuario receptor');
    }
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
    gmpDraggable: false,
  };
  addmarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPositions[0] = event.latLng.toJSON();
    }
    console.log(this.markerPositions[0].lat, this.markerPositions[0].lng);
  }
}
