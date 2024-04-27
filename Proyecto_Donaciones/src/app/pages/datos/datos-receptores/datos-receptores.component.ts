import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { receptorC } from '../../../services/models/receptor';

@Component({
  selector: 'app-datos-receptores',
  templateUrl: './datos-receptores.component.html',
  styleUrl: './datos-receptores.component.css'
})
export class DatosReceptoresComponent implements OnInit {
  receptores: receptorC[] = [];
  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.urlGetAllReceptores()
  }

  urlGetAllReceptores(){
    console.log('hola');
    
    this.loginService.urlGetAllReceptores().subscribe({
      next: (usersRIP_data) => {
        this.receptores = usersRIP_data;
      },
      error: (errorData) => {
        // console.log(errorData);
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }
}
