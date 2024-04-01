import { Injectable } from '@angular/core';
import { LoginUsuarioRequest } from './loginUsuarioRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Usuario } from './usuario';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
// los observadores se usan para el paso de datos mediante componentes
  currentUserLoginOn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("") ;
  //  inyeccion de http para usar sus metodos
  constructor(private http: HttpClient) {
    /**
     * Revision de sessionStorage pues genera errores
     */
    // this.currentUserLoginOn = new BehaviorSubject<Boolean> (sessionStorage.getItem("token")!=null);
    // this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "")
  }
  // LO DE ABAJO ES LO QUE MANDA
  // obtencion de las credenciales de BE, en un Observable de cualquier tipo pues el token es de tipo
  // string
  // LoginUsuarioRequest contienen el formato de credentials
  // puede que aqui se necesite el token de credentials

  login(credentials:LoginUsuarioRequest):Observable<any>{
    // console.log(credentials);


    // este metodo retorna un objeto de cualquier tipo cuando se envian 
    // se mandan la url contendina en environment: urlAuthLogin y las credenciales necesarias
    // 
    return this.http.post<any>(environment.urlAuthLogin, credentials).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);

        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map( (userData) => userData.token),
      catchError(this.handleError)
    );
    // la linea 17 esta RETORNANDO un objeto de tipo Usuario, deberia coincidir con el Usuario que me manda BE, que
    //a su vez le esta mandando la BD, TODO EN FORMATO JSON
  }

  // inyectar servicio en navbar
  logout(): void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.log('Se ha producido un error: ', error.error);
      
    }
    else {
      // console.log('BE retorno el codigo de estado:', error.status, error.error);  
      console.log('BE retorno el codigo de estado:', error);  
    }
    return throwError(()=> new Error('Algo fallo. Por favor intente nuevamente'))
  }


  get userData(): Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<Boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
