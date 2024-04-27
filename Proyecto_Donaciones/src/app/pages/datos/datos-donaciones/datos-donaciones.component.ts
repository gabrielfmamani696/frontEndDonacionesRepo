import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { Alimento } from '../../../services/models/alimento';
import { Producto } from '../../../services/models/producto';

@Component({
  selector: 'app-datos-donaciones',
  templateUrl: './datos-donaciones.component.html',
  styleUrl: './datos-donaciones.component.css'
})
export class DatosDonacionesComponent implements OnInit{
  alimentos: Alimento[] = [];
  productos: Producto[] = [];
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.display();
    // this.urlGetAllAlimentos();
  }

  urlGetAllAlimentos(){
    this.loginService.urlGetAllAlimentos().subscribe({
      next: (usersRIP_data) => {
        this.alimentos = usersRIP_data;
      },
      error: (errorData) => {
        // console.log(errorData);
      },
      complete: () => {
        // console.log("Despliegue de datos completo");
      },
    });
  }
  urlGetAllProductos(){
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

  display(){
    
    this.urlGetAllAlimentos();
    this.urlGetAllProductos();
  }
}
