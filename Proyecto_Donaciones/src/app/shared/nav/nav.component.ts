import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { FormBuilder, Validators } from '@angular/forms';
import { formRepOrgBenefica } from '../../services/models/formRepOrgBenefica';
import { formRepOrgReceptora } from '../../services/models/formRepOrgReceptora';
import { formEnviarRolEscoger } from '../../services/models/formEnviarRolEscoger';
import { currentUsuarioSimpleDataC } from '../../services/models/currentUsuarioSimpleData';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
// export class NavComponent implements OnInit, OnDestroy {
export class NavComponent implements OnInit {
  currentUserCorreoxd: string = '';
  usuarioLoginOn: Boolean = false;
  adminLoginOn: Boolean = false;
  formSolRepOrgBenefica = this.fb.group({
    area_servicio: ['', [Validators.required]],
    tipo_a: ['', [Validators.required]],
    ubicacion: ['', [Validators.required]],
    nombre_org: ['', [Validators.required]],
  });
  formSolRepOrgReceptora = this.fb.group({
    nombre_org: ['', [Validators.required]],
    tipo_org: ['', [Validators.required]],
    ubicacion: ['', [Validators.required]],
  });

  formSolRol = this.fb.group({
    correo: [''],
    rol: [''],
    contenido: [''],
  });

  formSolRol2: formEnviarRolEscoger = {
    correo: '',
    rol: '',
    contenido: '',
  };

  currentUsuarioSimpleData: currentUsuarioSimpleDataC = new currentUsuarioSimpleDataC();
  // usuarioLoginOn: Boolean =true;
  constructor(private loginService: LoginService, private fb: FormBuilder) {}

  // ngOnDestroy(): void {
  //   // this.loginService.currentUserData.unsubscribe();
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // }

  ngOnInit(): void {//este oninit se inicia desde la pagina home
    // console.log('', this.currentUsuarioSimpleData);
    // alerta al cambio en currentUserLoginOn
    this.isUserLoginOn();
    // this.currentUserCorreo = this.loginService.getCurrentCorreoValue();

    // alerta al cambio en adminLoginOn
    this.loginService.adminLoginOn.subscribe({
      next: (adminLO) => {
        this.adminLoginOn = adminLO;
      },
    });

    // this.loginService.loginAdmin().subscribe({
    //   next:(adminLO) => {
    //     this.adminLoginOn = adminLO;
    //   }
    // })
  }

  enviarRolDonadorSol() {
    this.currentUserCorreoxd = this.loginService.getCurrentCorreoValue();
    this.formSolRol2.correo = this.currentUserCorreoxd;
    this.formSolRol2.rol = 'Donante';

    if (this.formSolRol.valid) {
      this.loginService
        .enviarRolEscoger(this.formSolRol2 as formEnviarRolEscoger)
        .subscribe({
          error: (errorData) => {
            console.log(errorData);
          },
          complete: () => {
            // this.router.navigateByUrl('/');
            // this.formSolRol.reset();
            alert('Su solicitud para ser donador ha sido enviada')
          },
        });
    }
  }
  enviarRolVoluntarioSol() {
    this.currentUserCorreoxd = this.loginService.getCurrentCorreoValue();
    this.formSolRol2.correo = this.currentUserCorreoxd;
    this.formSolRol2.rol = 'Voluntario';

    if (this.formSolRol.valid) {
      this.loginService
        .enviarRolEscoger(this.formSolRol2 as formEnviarRolEscoger)
        .subscribe({
          error: (errorData) => {
            console.log(errorData);
          },
          complete: () => {
            // this.router.navigateByUrl('/');
            // this.formSolRol.reset();
            alert('Su solicitud para ser voluntario ha sido enviada')
          },
        });
    }
  }
  enviarRolReceptorSol() {
    this.currentUserCorreoxd = this.loginService.getCurrentCorreoValue();
    this.formSolRol2.correo = this.currentUserCorreoxd;
    this.formSolRol2.rol = 'Receptor';

    if (this.formSolRol.valid) {
      this.loginService
        .enviarRolEscoger(this.formSolRol2 as formEnviarRolEscoger)
        .subscribe({
          error: (errorData) => {
            console.log(errorData);
          },
          complete: () => {
            // this.router.navigateByUrl('/');
            // this.formSolRol.reset();
            alert('Su solicitud para ser receptor ha sido enviada')
          },
        });
    }
  }

  enviarFormSolRepOrgBenefica() {
    if (this.formSolRepOrgBenefica.valid) {
      const ubicacion = this.formSolRepOrgBenefica.value.ubicacion;
      const tipo_a = this.formSolRepOrgBenefica.value.tipo_a;
      const nombre_org = this.formSolRepOrgBenefica.value.nombre_org;
      const area_servicio = this.formSolRepOrgBenefica.value.area_servicio;

      // Formar la cadena con los valores en el orden deseado
      const cadena = `${ubicacion},${tipo_a},${nombre_org},${area_servicio}`;
      this.currentUserCorreoxd = this.loginService.getCurrentCorreoValue();
      this.formSolRol2.correo = this.currentUserCorreoxd;
      this.formSolRol2.rol = 'Voluntario';
      this.formSolRol2.contenido = cadena;

      this.loginService
        .enviarRolEscoger(this.formSolRol2 as formEnviarRolEscoger)
        .subscribe({
          error: (errorData) => {
            console.log(errorData);
          },
          complete: () => {
            // this.router.navigateByUrl('/');
            this.formSolRepOrgBenefica.reset();
            alert('Su solicitud para ser Rep. de Org. Benéfica ha sido enviada')
          },
        });

      // this.loginService
      //   .registroRepOrgBenefica(
      //     this.formSolRepOrgBenefica.value as formRepOrgBenefica
      //   )
      //   .subscribe({
      //     next: (info) => {
      //       console.log('info: ', info);

      //     },
      //     error: (errorData) => {
      //       console.log(errorData);
      //     },
      //     complete: () => {
      //       // this.router.navigateByUrl('/');
      //       this.formSolRepOrgBenefica.reset();
      //     },
      //   });
    } else {
      this.formSolRepOrgBenefica.markAllAsTouched();
      alert('Error al ingresar los datos');
    }
  }

  enviarFormSolRepOrgReceptora() {
    if (this.formSolRepOrgReceptora.valid) {
      // Obtener los valores del segundo formulario
      const nombre_org = this.formSolRepOrgReceptora.value.nombre_org;
      const tipo_org = this.formSolRepOrgReceptora.value.tipo_org;
      const ubicacion = this.formSolRepOrgReceptora.value.ubicacion;

      // Formar la cadena con los valores en el orden deseado
      const cadena = `${tipo_org},${ubicacion},${nombre_org}`;

      this.currentUserCorreoxd = this.loginService.getCurrentCorreoValue();
      this.formSolRol2.correo = this.currentUserCorreoxd;
      this.formSolRol2.rol = 'Voluntario';
      this.formSolRol2.contenido = cadena;

      this.loginService
        .enviarRolEscoger(this.formSolRol2 as formEnviarRolEscoger)
        .subscribe({
          error: (errorData) => {
            console.log(errorData);
          },
          complete: () => {
            // this.router.navigateByUrl('/');
            this.formSolRepOrgReceptora.reset();
            alert('Su solicitud para ser Rep. de Org. Receptora ha sido enviada')
          },
        });

      // this.loginService
      //   .registroRepOrgReceptora(
      //     this.formSolRepOrgReceptora.value as formRepOrgReceptora
      //   )
      //   .subscribe({
      //     error: (errorData) => {
      //       console.log(errorData);
      //     },
      //     complete: () => {
      //       // this.router.navigateByUrl('/');
      //       this.formSolRepOrgReceptora.reset();
      //     },
      //   });
    } else {
      this.formSolRepOrgReceptora.markAllAsTouched();
      alert('Error al ingresar los datos');
    }
  }
  isUserLoginOn() {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.usuarioLoginOn = userLoginOn;
      },
    });
  }

  pageLogInAdmin() {
    this.loginService.loginAdmin();
  }

  pageLogOutAdmin() {
    this.loginService.logoutAdmin();
  }

  pageLogInUsuario() {
    this.loginService.loginUsuario();
  }

  pageLogOutUsuario() {
    this.loginService.logoutUsuario();
  }

  LogOut() {
    this.pageLogOutAdmin();
    this.pageLogOutUsuario();
    this.loginService.nadaRol();
  }

  escogerSubRolVol(rol: string){
    
    this.currentUsuarioSimpleData = this.loginService.getCurrentUsuarioSimpleData();
    setTimeout(() => {
      console.log(this.currentUsuarioSimpleData.rol);
      if(this.currentUsuarioSimpleData.rol === 'Voluntario'){
        // this.currentUsuarioSimpleData = this.loginService.getCurrentUsuarioSimpleData();
        
        // console.log('', this.currentUsuarioSimpleData.correo);
        this.loginService.escogerSubRolVol(this.currentUsuarioSimpleData.correo, rol).subscribe({
          next: (salida) => {
            console.log('salida: ', salida);
            alert('Su solicitud para ser ' + rol + ' ha sido enviada.')
          },
        });

        // setTimeout(() => {
        // }, 100);
      } else {
        alert('necesitas ser parte de los usuarios voluntarios para acceder a esta opcion ')
      }
    }, 200);
    
  }
  // TODO
  // Faltan otras 2 para usuario loggeado
}
