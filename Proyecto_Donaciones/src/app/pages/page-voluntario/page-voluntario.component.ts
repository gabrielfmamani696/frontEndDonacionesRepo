import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Alimento } from '../../services/models/alimento';
import { Producto } from '../../services/models/producto';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../services/auth/usuario';
import { Router } from '@angular/router';
import { urlGetDonNoRealizadasC } from '../../services/models/getDonNoRealizadas';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';
import { urlGetAllSolicitudBC } from '../../services/models/urlGetAllSolicitudB';

@Component({
  selector: 'app-page-voluntario',
  templateUrl: './page-voluntario.component.html',
  styleUrl: './page-voluntario.component.css',
})
export class PageVoluntarioComponent implements OnInit {
  // Variables
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
  tblUrlGetDonNoRealizadas: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinResponsable: urlGetDonNoRealizadasC[] = [];
  tblUrlGetDonacionesNoRealizadasSinColaboradores: urlGetDonNoRealizadasC[] =
    [];

  
  tblGetAllSolicitudB: urlGetAllSolicitudBC[] = [];
  tblGetAllSolicitudBSinResponsable: urlGetAllSolicitudBC[] = [];
  tblAlimentoEntregar: Alimento[] = [
    {
      idAlimento: 2,
      fecha_Vencimiento: 'z',
      estado: 'z',
      tipo: 'z',
      cantidad: 2,
    },
  ];
  tblProductoRecoger: Producto[] = [
    {
      idProducto: 1,
      estado: 'Disponible',
      cantidad: 10,
      tipo: 'Electrónico',
    },
  ];
  tblProductoEntregar: Producto[] = [
    {
      idProducto: 4,
      estado: 'Disponible',
      cantidad: 20,
      tipo: 'Herramientas',
    },
  ];

  current_id: number = 0;
  current_user?: Usuario; //pasar el valor a traves de los Observables rxjs

  formColaboresAlimentoRecoger = this.fb.group({
    cantidad: [0, [Validators.required]],
  });

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  // Funciones
  ngOnInit(): void {
    // this.displayAlimentoEntregar();
    // this.displayAlimentoRecoger();
    // this.displayProductoEntregar();
    // this.displayProductoRecoger();
    this.currentUsuarioSimpleData =
      this.loginService.getCurrentUsuarioSimpleData();
    this.urlGetDonNoRealizadas();
    this.urlGetAllSolicitudB();
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

  enviarFormRecogerProducto() {
    console.log('Cantidad', this.formColaboresAlimentoRecoger.value.cantidad);
    this.enviarUsuarioSerRespRecogerProducto();
    this.enviarFormCantColabsResponsableRecogerProducto();
    this.router.navigateByUrl('pagevolColab');
  }

  serResponsableRecogerAlimento(id: number) {}

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
      this.tblUrlGetDonacionesNoRealizadasSinResponsable =
        this.tblUrlGetDonNoRealizadas.filter(
          (donacion) => donacion.estado === 'SinResponsable'
        );
    }, 200);
  }

  urlEscogerDonResponsable(id: number) {
    this.loginService
      .urlEscogerDonResponsable(id, this.currentUsuarioSimpleData.correo)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }
  urlEstablecerNroVolDonC(id: number, nrovol: number) {
    this.loginService
      .urlEstablecerNroVolDonC(id, this.currentUsuarioSimpleData.correo, nrovol)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }

  serResponsableRecoger() {
    // console.log(this.current_id, this.formColaboresAlimentoRecoger.value
    // .cantidad, this.currentUsuarioSimpleData.correo);
    
    if (this.formColaboresAlimentoRecoger.valid) {
      const num: number = this.formColaboresAlimentoRecoger.value
        .cantidad as number;
      this.urlEscogerDonResponsable(this.current_id);
      setTimeout(() => {
        this.urlEstablecerNroVolDonC(this.current_id, num);
      }, 200);
    }
    this.formColaboresAlimentoRecoger.reset;
    this.router.navigateByUrl('pagevolColab');
  }

  urlGetAllSolicitudB(){
    this.loginService.urlGetAllSolicitudB().subscribe({
      next: (data) => {
        this.tblGetAllSolicitudB = data;
      },
      error: (errorData) => {
        console.log(errorData);
      },
      complete: () => {
        console.log('Despliegue de datos completo');
      },
    });
    setTimeout(() => {
      this.tblGetAllSolicitudBSinResponsable =
        this.tblGetAllSolicitudB.filter(
          (donacion) => donacion.estado === 'SinResponsable'
        );
    }, 200);
  }

  urlEscogerSolResponsable(id: number) {
    console.log('holl');
    
    this.loginService
      .urlEscogerSolResponsable(id, this.currentUsuarioSimpleData.correo)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }
  urlEstablecerNroVolSolC(id: number, nrovol: number) {
    console.log('holl');
    this.loginService
      .urlEstablecerNroVolSolC(id, this.currentUsuarioSimpleData.correo, nrovol)
      .subscribe({
        next: (salida) => {
          console.log('salida: ', salida);
          // alert('Su solicitud para ser ha sido enviada.')
        },
      });
  }

  serResponsableEntregar() {
    if (this.formColaboresAlimentoRecoger.valid) {
      const num: number = this.formColaboresAlimentoRecoger.value
        .cantidad as number;
      this.urlEscogerSolResponsable(this.current_id);
      setTimeout(() => {
        this.urlEstablecerNroVolSolC(this.current_id, num);
      }, 200);
    }
    this.formColaboresAlimentoRecoger.reset;
    this.router.navigateByUrl('pagevolColab');
  }
}
