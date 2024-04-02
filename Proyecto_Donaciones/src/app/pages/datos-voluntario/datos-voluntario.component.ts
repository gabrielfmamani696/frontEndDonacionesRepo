import { Component } from '@angular/core';
import { VoluntariosList } from './datos.mock'

@Component({
  selector: 'app-datos-voluntario',
  templateUrl: './datos-voluntario.component.html',
  styleUrl: './datos-voluntario.component.css'
})
export class DatosVoluntarioComponent {
  // esto es para la tble
  listaDeVoluntarios = VoluntariosList;
}
