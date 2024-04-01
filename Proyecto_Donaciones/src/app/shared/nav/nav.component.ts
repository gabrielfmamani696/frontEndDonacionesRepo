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
  // usuarioLoginOn: Boolean =true;
  constructor(private loginService:LoginService){

  }

  // ngOnDestroy(): void {
  //   // this.loginService.currentUserData.unsubscribe();
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(UserLoginOn) => {
          this.usuarioLoginOn=UserLoginOn;
        }
      }
    )
  }
}
