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
}
