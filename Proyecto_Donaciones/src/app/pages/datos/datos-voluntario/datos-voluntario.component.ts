import { Component, OnInit } from '@angular/core';
import { VoluntariosList } from './datos.mock'
import { LoginService } from '../../../services/auth/login.service';
import { voluntarioC } from '../../../services/models/voluntario';

@Component({
  selector: 'app-datos-voluntario',
  templateUrl: './datos-voluntario.component.html',
  styleUrl: './datos-voluntario.component.css'
})
export class DatosVoluntarioComponent implements OnInit{
  // esto es para la tble
  listaDeVoluntarios: voluntarioC[] = [];
  constructor( private loginService: LoginService) {}
  ngOnInit(): void {
    this.display();
    
  }

  urlGetAllVoluntarios(){
    this.loginService.urlGetAllVoluntarios().subscribe({
      next: (usersRIP_data) => {
        this.listaDeVoluntarios = usersRIP_data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }

  display(){
    this.urlGetAllVoluntarios();
  }
}
