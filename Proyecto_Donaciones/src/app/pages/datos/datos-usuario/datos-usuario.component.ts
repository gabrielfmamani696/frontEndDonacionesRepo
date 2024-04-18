import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Usuario } from '../../../services/auth/usuario';
import { Raro } from '../../../services/models/raro';
import { UsuarioActualService } from '../../../services/share/usuario-actual.service';
import { Usuario2 } from '../../../services/auth/usuario2';
import { currentUsuarioSimpleDataC } from '../../../services/models/currentUsuarioSimpleData';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrl: './datos-usuario.component.css',
})
export class DatosUsuarioComponent implements OnInit {
  usuarioActualmenteActivo?: Usuario2 | null;
  loginError: string = '';
  userLoginOn: Boolean = false;
  currentUser?: Usuario;
  currentRaro?: Raro;
  currentUserCorreo?: string;
  currentUsuarioSimpleData: currentUsuarioSimpleDataC =
    new currentUsuarioSimpleDataC();
  // userData?: Usuario;
  constructor(private loginService: LoginService, private userDataShare: UsuarioActualService) {}

  // ngOnDestroy(): void {
  //   this.loginService.currentUserData.unsubscribe();
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // }

  ngOnInit(): void {
    this.usuarioActualmenteActivo = this.userDataShare.getUsuarioActualmenteActivo();
    this.currentUsuarioSimpleData = this.loginService.getCurrentUsuarioSimpleData();
    // this.currentUserCorreo = this.loginService.getCurrentCorreoValue();
    this.currentUserCorreo = this.currentUsuarioSimpleData.correo;
    this.isUserLoginOn();

    // this.loginService.currentUserData.subscribe({
    //   next:(userData) => {
    //     this.userData = userData;
    //   }
    // })

    // this.datosUsuario(1);

    this.datosRaro(1);
  }
// para actulizar el esto de currente userloginON
  isUserLoginOn(){
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      },
    });
  }

  datosUsuario(id: number) {
    this.loginService.usuarioData(id).subscribe({
      next: (user) => {
        this.currentUser = user;
      },
    });
  }

  datosRaro(id: number) {
    this.loginService.raroData(id).subscribe({
      next: (raro) => {
        // no hace nada
        // console.log(raro);
        this.currentRaro = raro;
      },
    });
  }
}
