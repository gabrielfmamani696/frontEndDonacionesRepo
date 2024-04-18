import { Component } from '@angular/core';

@Component({
  selector: 'app-page-voluntario-colaborador',
  templateUrl: './page-voluntario-colaborador.component.html',
  styleUrl: './page-voluntario-colaborador.component.css'
})
export class PageVoluntarioColaboradorComponent {
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
}
