import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
// export class NavComponent implements OnInit, OnDestroy {
export class NavComponent implements OnInit {
  usuarioLoginOn: Boolean = false;
  adminLoginOn: Boolean = false ;
  // usuarioLoginOn: Boolean =true;
  constructor(private loginService:LoginService){

  }

  // ngOnDestroy(): void {
  //   // this.loginService.currentUserData.unsubscribe();
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // }

  ngOnInit(): void {;
    // alerta al cambio en currentUserLoginOn
    this.loginService.currentUserLoginOn.subscribe({
      next:(UserLoginOn) => {
        this.usuarioLoginOn=UserLoginOn;
      }
    })


    // alerta al cambio en adminLoginOn
    this.loginService.adminLoginOn.subscribe({
      next:(adminLO) => {
        this.adminLoginOn = adminLO;
      }
    })

    // this.loginService.loginAdmin().subscribe({
    //   next:(adminLO) => {
    //     this.adminLoginOn = adminLO;
    //   }
    // })
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

  LogOut(){
    this.pageLogOutAdmin();
    this.pageLogOutUsuario();
  }

  // TODO
  // Faltan otras 2 para usuario loggeado
}
