import { Injectable } from '@angular/core';
import { LoginUsuarioRequest } from './loginUsuarioRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Usuario } from './usuario';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Raro } from '../models/raro';
import { formSolUsuario } from './formSolUsuario';
import { usuarioRechazadoInabilitadoPendiente } from '../models/usuarioRechazadoInabilitadoPendiente';
import { usuarioAceptado } from '../models/usuarioAceptado';
import { formDonacion } from '../models/formDonacion';
import { formAlimento } from '../models/formAlimento';
import { formProducto } from '../models/formProducto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  rol: BehaviorSubject<string> = new BehaviorSubject<string>('');
  //
  raro: Raro = {
    idorganizacion: 0,
    mision: '',
    vision: 'string',
    quehacemos: 'string',
  };
  currentRaro: BehaviorSubject<Raro> = new BehaviorSubject<Raro>(this.raro);
  // los observadores se usan para el paso de datos mediante componentes
  currentUserLoginOn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');
  currentUserID: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  adminLoginOn: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  solUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);

  idUsuario: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  // solo para llenar
  users: Usuario = {
    id: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    contrasena: 'contraseña123',
    confcontrasena: 'contraseña123',
    correo: 'juan@example.com',
    telefono: 123456789,
  };
  currentUser: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(
    this.users
  );
  // usuarioRechazadoInabilitadoPendiente

  // defaultUsersRIP: usuarioRechazadoInabilitadoPendiente = {id: 9, nombre: "Londres", apellido: "minion", correo: "Lone@gmail.com", telefono: 156489, estado: "Rechazado"};
  currentUsersRIP: BehaviorSubject<usuarioRechazadoInabilitadoPendiente[]> =
    new BehaviorSubject<usuarioRechazadoInabilitadoPendiente[]>([]);

  // usuarioAceptado
  userAcept?: usuarioAceptado;

  mensajeAceptar: BehaviorSubject<string> = new BehaviorSubject<string>('');
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

  login(credentials: LoginUsuarioRequest): Observable<any> {
    // console.log(credentials);

    // este metodo retorna un objeto de cualquier tipo cuando se envian
    // se mandan la url contendina en environment: urlAuthLogin y las credenciales necesarias
    //
    return this.http.post<any>(environment.urlAuthLogin, credentials).pipe(
      tap((userData) => {
        // esta linea maneja el token
        sessionStorage.setItem('token', userData.token);

        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
    // la linea 17 esta RETORNANDO un objeto de tipo Usuario, deberia coincidir con el Usuario que me manda BE, que
    //a su vez le esta mandando la BD, TODO EN FORMATO JSON
  }

  registroUsuario(data: formSolUsuario): Observable<any> {
    return this.http
      .post(environment.urlFormSolUsuario, data, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  registroDonacion(data: formDonacion): Observable<any> {
    return this.http.post(environment.urlFormDonacion, data ).pipe(
      tap((userData) => {
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }
  registroAlimento(data: formAlimento): Observable<any> {
    return this.http.post(environment.urlFormAlimento, data ).pipe(
      tap((userData) => {
        // this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }
  registroProducto(data: formProducto): Observable<any> {
    return this.http.post(environment.urlFormProducto, data ).pipe(
      tap((userData) => {
        // this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }

  // inyectar servicio en navbar
  // logout(): void{
  //   sessionStorage.removeItem("token");
  //   this.currentUserLoginOn.next(false);
  // }

  logout(): void {
    sessionStorage.removeItem('token');
    this.currentUserLoginOn.next(false);
    this.currentUserData.next('');
    // analisar
  }
  // actualizacion de valores actualizacion de valores actualizacion de valores actualizacion de valores
  // actualizacion de valores actualizacion de valores actualizacion de valores actualizacion de valores
  // actualizacion de valores actualizacion de valores actualizacion de valores actualizacion de valores
  // actualizacion de valores actualizacion de valores actualizacion de valores actualizacion de valores
  // actualizacion de valores actualizacion de valores actualizacion de valores actualizacion de valores
  loginAdmin(): void {
    this.adminLoginOn.next(true);
  }

  logoutAdmin(): void {
    this.adminLoginOn.next(false);
  }

  loginUsuario(): void {
    this.currentUserLoginOn.next(true);
  }

  logoutUsuario(): void {
    this.currentUserLoginOn.next(false);
  }
// para setear el valor al id del usuario
  currentIdValueSet(id: number):void {
    this.currentUserID
    .next(id);
  }

  adminRol(): void {
    this.rol.next('admin');
  }

  nadaRol(): void {
    this.rol.next('');
  }

  // adminValueVoid(): void {
  //   this.rol.next('')
  // }

  // adminValue(): void {
  //   sessionStorage.setItem('rol', 'admin');
  //   rolAdmin: string =sessionStorage.getItem('rol');
  //   this.rol.next();
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('Se ha producido un error: ', error.error);
    } else {
      // console.log('BE retorno el codigo de estado:', error.status, error.error);
      console.log('BE retorno el codigo de estado:', error);
    }
    return throwError(
      () => new Error('Algo fallo. Por favor intente nuevamente')
    );
  }
  // para obtener un json de usuarios?
  solicitudesUsuario(): Observable<Usuario[]> {
    return this.http
      .get<Usuario[]>(environment.urlObtenerSolicitudUsuarios)
      .pipe(
        tap((usersData) => {
          this.solUsuarios.next(usersData);
        }),
        // map( (usersData) => userData.token),
        catchError(this.handleError)
      );
    // return this.http.get<Usuario[]>;
  }

  usuarioData(id: number): Observable<Usuario> {
    let token = sessionStorage.getItem('token');
    // console.log(token);

    // const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const head = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http
      .get<Usuario>(environment.urlUsuarioID + id, { headers: head })
      .pipe(
        tap((userInfo) => {
          this.currentUser.next(userInfo);
        }),
        catchError(this.handleError)
      );
  }

  raroData(id: number): Observable<Raro> {
    let token = sessionStorage.getItem('token');
    // console.log(token);

    // const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const head = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http
      .get<Raro>(environment.urlRaroID + id, { headers: head })
      .pipe(
        tap((raroInfo) => {
          this.currentRaro.next(raroInfo);
        }),
        catchError(this.handleError)
      );
  }

  userAceptar(id: number): Observable<string> {
    let token = sessionStorage.getItem('token');
    const head = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http
      .get(environment.urlAceptarUsuario + id, {
        headers: head,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  userSolRechazar(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    const head = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http
      .get(environment.urlRechazarUsuario + id, {
        headers: head,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  allUsuarioRechazadoInabilitadoPendiente(): Observable<
    usuarioRechazadoInabilitadoPendiente[]
  > {
    let token = sessionStorage.getItem('token');
    // let token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3MTIyODY5NTIsImV4cCI6MTcxMjI4ODM5Mn0.Th2Vv6h4nayi4blUDk98Cabo1tRC1lDd8xKuixa98Co";
    // console.log(token);

    // const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const head = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http
      .get<usuarioRechazadoInabilitadoPendiente[]>(
        environment.urlGetAllUsuarioRechazadoInabilitadoPendiente,
        { headers: head }
      )
      .pipe(
        tap((data) => {
          this.currentUsersRIP.next(data);
        }),
        catchError(this.handleError)
      );
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<Boolean> {
    return this.currentUserLoginOn.asObservable();
  }
  // guard

  isAdmin(): boolean {
    // if(sessionStorage.getItem('rol') === 'admin'){
    //   return true;
    // }else{
    //   return false;
    // }
    const rolActual = this.rol.getValue();
    // if(rolActual === 'admin'){
    //   return true;
    // }else{
    //   return false;
    // }
    return rolActual === 'admin';
  }
}
