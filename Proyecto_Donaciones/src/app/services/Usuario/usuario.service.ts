import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../auth/usuario';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Despliegue de usuario
  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(environment.urlObtenerSolicitudUsuarios)
  }
}
