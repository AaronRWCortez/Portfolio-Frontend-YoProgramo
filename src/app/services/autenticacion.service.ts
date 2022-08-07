import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  url = 'https://back-v-2.herokuapp.com';
  currentUserSubject: BehaviorSubject<any>;
  parcero: boolean | undefined;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }

  IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(`${this.url}/api/login`, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);

        this.parcero = true;

        return data;
      })
    );
  }

  get UsuarioAutenticado() {
    return this.currentUserSubject.value;
  }

  loggedIn() {
    return this.parcero;
  }
  logoutUser() {
    this.parcero = false;
    sessionStorage.clear();
    localStorage.clear();

    this.currentUserSubject.next(null);
    alert('LOGOUT!');
  }
}
