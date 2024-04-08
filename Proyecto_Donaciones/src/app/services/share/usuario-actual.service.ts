import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../auth/usuario';
import { HttpClient } from '@angular/common/http';
import { Usuario2 } from '../auth/usuario2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {

  constructor(private http: HttpClient) { }

  // Usuario actualmente activo
  // usuarioActualmenteActivo: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>();
  usuarioActualmenteActivo: BehaviorSubject<Usuario2 | null> = new BehaviorSubject<Usuario2 | null>(null);

  

  setUsuarioActualmenteActivo(usuario: Usuario2): void {
    this.usuarioActualmenteActivo.next(usuario);
  }


  getUsuarioActualmenteActivo(): Usuario2 | null {
    return this.usuarioActualmenteActivo.getValue();
  }
}
