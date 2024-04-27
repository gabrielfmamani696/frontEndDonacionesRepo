import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { donanteC } from '../../../services/models/donante';

@Component({
  selector: 'app-datos-donadores',
  templateUrl: './datos-donadores.component.html',
  styleUrl: './datos-donadores.component.css'
})
export class DatosDonadoresComponent implements OnInit{
  donantes: donanteC[] =[]
  constructor( private loginService: LoginService) {}
  ngOnInit(): void {
    this.urlGetAllDonantes()
  }

  urlGetAllDonantes(){
    this.loginService.urlGetAllDonantes().subscribe({
      next: (usersRIP_data) => {
        this.donantes = usersRIP_data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }
}
