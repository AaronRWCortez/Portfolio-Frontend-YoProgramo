import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../model/login-usuario';
import { NuevoUsuario } from '../model/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://backend-arwc.herokuapp.com'

  constructor(private http : HttpClient) { }


  addItem(nuevoUsuario: NuevoUsuario): Observable<any>{
    const url = `${this.apiUrl}/usuarios/crear`    
    return this.http.post<any>(url, nuevoUsuario)
  }

  public login(loginUsuario: LoginUsuario): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, loginUsuario)
  }
}
