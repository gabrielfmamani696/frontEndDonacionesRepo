import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Alimento } from '../../services/models/alimento';
import { Producto } from '../../services/models/producto';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../services/auth/usuario';
import { Router } from '@angular/router';
import { urlGetDonNoRealizadasC } from '../../services/models/getDonNoRealizadas';

@Component({
  selector: 'app-page-voluntario',
  templateUrl: './page-voluntario.component.html',
  styleUrl: './page-voluntario.component.css',
})
export class PageVoluntarioComponent implements OnInit {
  // Variables
  tblUrlGetDonNoRealizadas: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinResponsable: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinColaboradores: urlGetDonNoRealizadasC[] = [];
  tblAlimentoEntregar: Alimento[] = [
    {
      id_alimento: 2, fecha_venc: 'z', estado: 'z', tipo: 'z', cantidad: 2,
    },
  ];
  tblProductoRecoger: Producto[] = [
    {
      id_producto: 1, estado: 'Disponible', cantidad: 10, tipo: 'Electrónico',
    },
  ];
  tblProductoEntregar: Producto[] = [
    {
      id_producto: 4, estado: 'Disponible', cantidad: 20, tipo: 'Herramientas',
    },
  ];

  current_id: number = 0;
  current_user?: Usuario; //pasar el valor a traves de los Observables rxjs

  formColaboresAlimentoRecoger = this.fb.group({
    cantidad: [0, [Validators.required]],
  });

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {}
  // Funciones
  ngOnInit(): void {
    // this.displayAlimentoEntregar();
    // this.displayAlimentoRecoger();
    // this.displayProductoEntregar();
    // this.displayProductoRecoger();
    this.urlGetDonNoRealizadas()
  }

  setCurrentID(id: number) {
    this.current_id = id;
    // this.current_id.next(id) mandar con el observable al usaurio logueado,
    // no es necesario el parametro id
  }

  enviarFormColaboresAlimentoRecoger() {}

  // displayAlimentoRecoger() {
  //   this.loginService.dataTblAlimentoRecoger().subscribe({
  //     next: (data) => {
  //       this.tblAlimentoRecoger = data;
  //     },
  //     error: (errorData) => {
  //       console.log(errorData);
  //     },
  //     complete: () => {
  //       console.log('Despliegue de datos completo');
  //     },
  //   });
  // }

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
          //cuando una conexion se completa, se nos envia a la ruta: /datausuario
          // this.router.navigateByUrl('/datausuario');
          //se vacian los datos del formulario
          // this.formColaboresAlimentoRecoger.reset();
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

  enviarFormRecogerProducto(){
    console.log('Cantidad', this.formColaboresAlimentoRecoger.value.cantidad);
    this.enviarUsuarioSerRespRecogerProducto();
    this.enviarFormCantColabsResponsableRecogerProducto();
    this.router.navigateByUrl('pagevolColab');
  }
  
  serResponsableRecogerAlimento(id: number) {}


  urlGetDonNoRealizadas(){
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
      this.tblUrlGetDonacionesNoRealizadasSinResponsable =this.tblUrlGetDonNoRealizadas.filter(donacion => donacion.estado === "SinResponsable");
    }, 200);
  }
}
