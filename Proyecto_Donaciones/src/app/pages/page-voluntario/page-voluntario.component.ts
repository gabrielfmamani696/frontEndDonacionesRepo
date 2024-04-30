import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Alimento } from '../../services/models/alimento';
import { Producto } from '../../services/models/producto';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../services/auth/usuario';
import { Router } from '@angular/router';
import { urlGetDonNoRealizadasC } from '../../services/models/getDonNoRealizadas';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';
import { urlGetAllSolicitudBC } from '../../services/models/urlGetAllSolicitudB';
import { miActividadC } from '../../services/models/miActividad';

@Component({
  selector: 'app-page-voluntario',
  templateUrl: './page-voluntario.component.html',
  styleUrl: './page-voluntario.component.css',
})
export class PageVoluntarioComponent implements OnInit {
  partes: string[] = [];
  latitud: string = '';
  longitud: string = '';
  // Variables
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
  tblUrlGetDonNoRealizadas: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinResponsable: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinColaboradores: urlGetDonNoRealizadasC[] =
    [];

  tblMisActividades: miActividadC[] = [];
  tblGetAllSolicitudB: urlGetAllSolicitudBC[] = [];
  tblGetAllSolicitudBSinResponsable: urlGetAllSolicitudBC[] = [];
  tblAlimentoEntregar: Alimento[] = [];
  tblProductoRecoger: Producto[] = [];
  tblProductoEntregar: Producto[] = [];

  current_id: number = 0;
  current_user?: Usuario; //pasar el valor a traves de los Observables rxjs

  formColaboresAlimentoRecoger = this.fb.group({
    cantidad: [0, [Validators.required]],
  });

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  nuevaPosicion: google.maps.LatLngLiteral = { lat: -16.504912732916537, lng: -68.12993288040161 };
  markerPositions: google.maps.LatLngLiteral[] = [];
  // Funciones
  ngOnInit(): void {
    this.currentUsuarioSimpleData =
      this.loginService.getCurrentUsuarioSimpleData();
    setTimeout(()=>{
      this.urlGetAllDonacionesResponsable();
    }, 100);
    this.urlGetDonNoRealizadas();
    this.urlGetAllSolicitudB();
  }

  setCurrentID(id: number) {
    this.current_id = id;
  }

  enviarFormColaboresAlimentoRecoger() {}


  displayAlimentoEntregar() {
    this.loginService.dataTblAlimentoEntregar().subscribe({
      next: (data) => {
        this.tblAlimentoEntregar = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue de datos completo');
      },
    });
  }
  displayProductoRecoger() {
    this.loginService.dataTblProductoRecoger().subscribe({
      next: (data) => {
        this.tblProductoRecoger = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue de datos completo');
      },
    });
  }
  displayProductoEntregar() {
    this.loginService.dataTblProductoEntregar().subscribe({
      next: (data) => {
        this.tblProductoEntregar = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue de datos completo');
      },
    });
  }

  enviarUsuarioSerRespRecogerAlimento() {
    this.loginService
      .registroResponsableRecogerAlimento(this.current_user as Usuario)
      .subscribe({
        next: (userData) => {
          // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
          // console.log(this.currentUser?.id); //este dato deberia manejarse en otros componentes
          // sessionStorage.setItem('rol', 'usuario');
        },
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          //confirmacion
          console.log('login completo');
        },
      });
  }

  enviarFormCantColabsResponsableRecogerAlimento() {
    this.loginService
      .registroNroColaboradoresParaResponsableRecogerAlimento(
        this.formColaboresAlimentoRecoger.value.cantidad as number
      )
      .subscribe({
        next: (userData) => {
          // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
          // console.log(this.currentUser?.id); //este dato deberia manejarse en otros componentes
          // sessionStorage.setItem('rol', 'usuario');
        },
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          //confirmacion
          console.log('login completo');
          //cuando una conexion se completa, se nos envia a la ruta: /datausuario
          // this.router.navigateByUrl('/datausuario');
          //se vacian los datos del formulario
          this.formColaboresAlimentoRecoger.reset();
        },
      });
  }

  enviarUsuarioSerRespRecogerProducto() {
    this.loginService
      .registroResponsableRecogerProducto(this.current_user as Usuario)
      .subscribe({
        next: (userData) => {
          // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
          // console.log(this.currentUser?.id); //este dato deberia manejarse en otros componentes
          // sessionStorage.setItem('rol', 'usuario');
        },
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          //confirmacion
          console.log('login completo');
          //cuando una conexion se completa, se nos envia a la ruta: /datausuario
          // this.router.navigateByUrl('/datausuario');
          //se vacian los datos del formulario
          // this.formColaboresAlimentoRecoger.reset();
        },
      });
  }

  enviarFormCantColabsResponsableRecogerProducto() {
    this.loginService
      .registroNroColaboradoresParaResponsableRecogerProducto(
        this.formColaboresAlimentoRecoger.value.cantidad as number
      )
      .subscribe({
        next: (userData) => {
          // console.log(userData); // esto imprime informacion sensible, como el token cuidado al reiniciar operaciones
          // console.log(this.currentUser?.id); //este dato deberia manejarse en otros componentes
          // sessionStorage.setItem('rol', 'usuario');
        },
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          //confirmacion
          console.log('login completo');
          //cuando una conexion se completa, se nos envia a la ruta: /datausuario
          // this.router.navigateByUrl('/datausuario');
          //se vacian los datos del formulario
          this.formColaboresAlimentoRecoger.reset();
        },
      });
  }

  enviarFormRecogerAlimento() {
    console.log('Cantidad', this.formColaboresAlimentoRecoger.value.cantidad);
    // this.enviarUsuarioSerRespRecogerAlimento();
    // this.enviarFormCantColabsResponsableRecogerAlimento();
    // enviar
    this.router.navigateByUrl('pagevolColab');
  }

  enviarFormRecogerProducto() {
    console.log('Cantidad', this.formColaboresAlimentoRecoger.value.cantidad);
    this.enviarUsuarioSerRespRecogerProducto();
    this.enviarFormCantColabsResponsableRecogerProducto();
    this.router.navigateByUrl('pagevolColab');
  }

  serResponsableRecogerAlimento(id: number) {}

  urlGetDonNoRealizadas() {
    this.loginService.urlGetDonNoRealizadas().subscribe({
      next: (data) => {
        this.tblUrlGetDonNoRealizadas = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue de datos completo');
      },
    });
    setTimeout(() => {
      this.tblUrlGetDonacionesNoRealizadasSinResponsable =
        this.tblUrlGetDonNoRealizadas.filter(
          (donacion) => donacion.estado === 'SinResponsable'
        );
    }, 200);
  }

  urlEscogerDonResponsable(id: number) {
    this.loginService
      .urlEscogerDonResponsable(id, this.currentUsuarioSimpleData.correo)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }
  urlEstablecerNroVolDonC(id: number, nrovol: number) {
    this.loginService
      .urlEstablecerNroVolDonC(id, this.currentUsuarioSimpleData.correo, nrovol)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }

  serResponsableRecoger() {
    // console.log(this.current_id, this.formColaboresAlimentoRecoger.value
    // .cantidad, this.currentUsuarioSimpleData.correo);
    if(this.currentUsuarioSimpleData.rol==='Voluntario' && this.currentUsuarioSimpleData.rolVol === 'Responsable'){
      if (this.formColaboresAlimentoRecoger.valid) {
        const num: number = this.formColaboresAlimentoRecoger.value
          .cantidad as number;
        this.urlEscogerDonResponsable(this.current_id);
        setTimeout(() => {
          this.urlEstablecerNroVolDonC(this.current_id, num);
          this.formColaboresAlimentoRecoger.reset();
        }, 500);
        setTimeout(() => {
          this.router.navigateByUrl('pagevolColab');
        }, 1250);
      }
      this.formColaboresAlimentoRecoger.reset();
    } else {
      alert('Usted no es usuario Voluntario-Responsable')
    }

  }

  urlGetAllSolicitudB(){
    this.loginService.urlGetAllSolicitudB().subscribe({
      next: (data) => {
        this.tblGetAllSolicitudB = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue de datos completo');
      },
    });
    setTimeout(() => {
      this.tblGetAllSolicitudBSinResponsable =
        this.tblGetAllSolicitudB.filter(
          (donacion) => donacion.estado === 'SinResponsable'
        );
    }, 200);
  }

  urlEscogerSolResponsable(id: number) {
    console.log('holl');
    
    this.loginService
      .urlEscogerSolResponsable(id, this.currentUsuarioSimpleData.correo)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }
  urlEstablecerNroVolSolC(id: number, nrovol: number) {
    console.log('holl');
    this.loginService
      .urlEstablecerNroVolSolC(id, this.currentUsuarioSimpleData.correo, nrovol)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }

  serResponsableEntregar() {

    if(this.currentUsuarioSimpleData.rol==='Voluntario' && this.currentUsuarioSimpleData.rolVol === 'Responsable'){
      if (this.formColaboresAlimentoRecoger.valid) {
        const num: number = this.formColaboresAlimentoRecoger.value
          .cantidad as number;
        this.urlEscogerSolResponsable(this.current_id);
        setTimeout(() => {
          this.urlEstablecerNroVolSolC(this.current_id, num);
        }, 200);
      }
      this.formColaboresAlimentoRecoger.reset;
      this.router.navigateByUrl('pagevolColab');
    } else {
      alert('Usted no es usuario Voluntario-Responsable')
    }
  }

  urlGetAllDonacionesResponsable(){
    this.loginService.urlGetAllDonacionesResponsable(this.currentUsuarioSimpleData.correo).subscribe({
      next: (data) => {
        this.tblMisActividades = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue de datos completo');
      },
    });
  }
  center: google.maps.LatLngLiteral = {
    lat: -16.504912732916537,
    lng: -68.12993288040161,
  };
  mostrarUbicacion(coords: string){
    const latlang = coords.split(',');

    // partes[0] contendrá la primera parte de la cadena antes de la coma
    this.latitud = latlang[0];

    // partes[1] contendrá la segunda parte de la cadena después de la coma
    this.longitud = latlang[1];
    console.log(this.latitud, this.longitud);
    this.markerPositions[0]= { lat: parseFloat(this.latitud) , lng: parseFloat(this.longitud) };
    this.center = { lat: parseFloat(this.latitud) , lng: parseFloat(this.longitud) };
  }

  label = {
    color: 'red',
    text: 'Marcador',
  };

  
  zoom = 17;
  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {
    gmpDraggable: false
  }
  // addmarker(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) {
  //     this.markerPositions[0]= event.latLng.toJSON();
  //   };
  //   console.log(this.markerPositions[0].lat, this.markerPositions[0].lng);
  // }
}
