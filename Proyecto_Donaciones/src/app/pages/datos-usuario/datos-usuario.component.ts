import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Usuario } from '../../services/auth/usuario';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrl: './datos-usuario.component.css'
})
export class DatosUsuarioComponent implements OnInit, OnDestroy{
  userLoginOn: Boolean = false;
  // userData?: Usuario;
  constructor(private loginService: LoginService){

  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })

    // this.loginService.currentUserData.subscribe({
    //   next:(userData) => {
    //     this.userData = userData;
    //   }
    // })
  }
}
