import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { urlGetDonNoRealizadasC } from '../../services/models/getDonNoRealizadas';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';

@Component({
  selector: 'app-page-voluntario-colaborador',
  templateUrl: './page-voluntario-colaborador.component.html',
  styleUrl: './page-voluntario-colaborador.component.css'
})
export class PageVoluntarioColaboradorComponent implements OnInit{
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
  tblUrlGetDonNoRealizadas: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinColaboradores: urlGetDonNoRealizadasC[] =
    [];
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
      
    // this.currentUsuarioSimpleData =
    // this.loginService.getCurrentUsuarioSimpleData();
    this.urlGetDonNoRealizadas();
    this.currentUsuarioSimpleData = this.loginService.getCurrentUsuarioSimpleData();
  }
  donacionesRecoger = [
    {
      tipoDonacion: 'Recoger Alimento',
      detalles: 'Pan, 100 unidades',
      disponibilidad: '2024-01-01T12:00',
      nroVoluntarios: 1,
      cantidadRequeridaVoluntarios: 5,
      cantidad: 100
    },
  ];

  donacionesEntregar = [
    {
      tipoDonacion: 'Entregar Ropa',
      detalles: 'Camisas, 50 unidades',
      disponibilidad: '2024-02-01T10:00',
      nroVoluntarios: 2,
      cantidadRequeridaVoluntarios: 4,
      cantidad: 50
    },
  ];

 
  mostrarMensaje = false; 

  postular(tipo: string, index: number): void {
    let donacion = tipo === 'recoger' ? this.donacionesRecoger[index] : this.donacionesEntregar[index];
    if (donacion.nroVoluntarios < donacion.cantidadRequeridaVoluntarios) {
      donacion.nroVoluntarios++;
    }
    this.mostrarMensaje = true;

    setTimeout(() => this.mostrarMensaje = false, 5000);
  }


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
          (donacion) => donacion.estado === 'Pendiente'
        );
    }, 200);
  }

  serColaborador(id: number){
    setTimeout(() => {
      this.loginService
        .urlEscogerDonColaborador(id, this.currentUsuarioSimpleData.correo)
        .subscribe({
          next: (salida) => {
            console.log('salida: ', salida);
            // alert('Su solicitud para ser ha sido enviada.')
          },
        });  

    }, 150)
    setTimeout(() => {
      this.urlGetDonNoRealizadas();
    }, 200)
  }
}
