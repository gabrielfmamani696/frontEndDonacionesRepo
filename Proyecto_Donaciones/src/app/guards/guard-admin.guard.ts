import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const guardAdminGuard: CanActivateFn = (route, state) => {
  // return true;
  const isadmin = inject(LoginService);
  return isadmin.isAdmin();
  // const isadmin = inject(LoginService);
  // const router = inject(Router);
  // if(isadmin){
  //   return true
  // } else {
  //   // const url = router.createUrlTree([''])
  //   // return url;
  //   router.navigateByUrl('/');
  //   return false;
  // }
};
