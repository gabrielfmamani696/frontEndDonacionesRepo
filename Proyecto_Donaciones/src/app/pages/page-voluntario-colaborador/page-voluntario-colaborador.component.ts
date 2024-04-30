import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { urlGetDonNoRealizadasC } from '../../services/models/getDonNoRealizadas';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';
import { urlGetAllSolicitudBC } from '../../services/models/urlGetAllSolicitudB';
import { miActividadC } from '../../services/models/miActividad';

@Component({
  selector: 'app-page-voluntario-colaborador',
  templateUrl: './page-voluntario-colaborador.component.html',
  styleUrl: './page-voluntario-colaborador.component.css'
})
export class PageVoluntarioColaboradorComponent implements OnInit{
  partes: string[] = [];
  latitud: string = '';
  longitud: string = '';
  nuevaPosicion: google.maps.LatLngLiteral = { lat: -16.504912732916537, lng: -68.12993288040161 };
  markerPositions: google.maps.LatLngLiteral[] = [];
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
    tblMisActividades: miActividadC[] = [];
  tblUrlGetDonNoRealizadas: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinColaboradores: urlGetDonNoRealizadasC[] =
    [];
  tblGetAllSolicitudB: urlGetAllSolicitudBC[] = [];
  tblGetAllSolicitudBSinColabaradores: urlGetAllSolicitudBC[] = [];
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
      
    // this.currentUsuarioSimpleData =
    // this.loginService.getCurrentUsuarioSimpleData();
    setTimeout(() => {
      this.urlGetDonNoRealizadas();
      this.currentUsuarioSimpleData = this.loginService.getCurrentUsuarioSimpleData();
      this.urlGetAllSolicitudB();
    }, 150);
    
    setTimeout(()=>{
      this.urlGetAllDonacionesColaborador();
    }, 300);
  }

 
  mostrarMensaje = false; 


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
      this.tblUrlGetDonacionesNoRealizadasSinColaboradores =
        this.tblUrlGetDonNoRealizadas.filter(
          (donacion) => donacion.estado === 'Pendiente' && donacion.nroColaboradores < donacion.nroRequeridoCol
        );
    }, 200);
  }

  serColaborador(id: number){
    if(this.currentUsuarioSimpleData.rol==='Voluntario' && this.currentUsuarioSimpleData.rolVol === 'Colaborador'){
      setTimeout(() => {
        this.loginService
          .urlEscogerDonColaborador(id, this.currentUsuarioSimpleData.correo)
          .subscribe({
            next: (salida) => {
              console.log('salida: ', salida);
              alert('Es posible que ya seas parte de esta actividad')
              // alert('Su solicitud para ser ha sido enviada.')
            },
          });  
  
      }, 75)
      setTimeout(() => {
        this.urlGetDonNoRealizadas();
      }, 125)

    } else {
      alert('Usten no es un Voluntario-Colaborador')
    }
  }

  urlGetAllSolicitudB(){
    setTimeout(() => {
      this.loginService.urlGetAllSolicitudB().subscribe({
        next: (data) => {
          this.tblGetAllSolicitudB = data;
        },
        error: (errorData) => {
          console.log(errorData);
        },
        complete: () => {
          console.log('Despliegue de datos 2 completo');
        },
      });
    }, 100);
    setTimeout(() => {
      this.tblGetAllSolicitudBSinColabaradores =
        this.tblGetAllSolicitudB.filter(
          (donacion) => donacion.estado === 'Pendiente' && donacion.nroColaboradores < donacion.nroRequeridoCol
        );
    }, 200);
  }

  urlEscogerSolColaborador(id: number){
    setTimeout(() => {
      this.loginService
        .urlEscogerSolColaborador(id, this.currentUsuarioSimpleData.correo)
        .subscribe({
          next: (salida) => {
            console.log('salida: ', salida);
            alert('Es posible que ya seas parte de esta actividad')
            // alert('Su solicitud para ser ha sido enviada.')
          },
        });  

    }, 150)
    setTimeout(() => {
      this.urlGetAllSolicitudB();
    }, 200)
  } 

  urlGetAllDonacionesColaborador(){
    this.loginService.urlGetAllDonacionesColaborador(this.currentUsuarioSimpleData.correo).subscribe({
      next: (data) => {
        this.tblMisActividades = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue urlGetAllDonacionesColaborador');
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
