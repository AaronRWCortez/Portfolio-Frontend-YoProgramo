import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  regUser:string = 'Admin'
  regPass:string = 'Admin'

  constructor() { }

  setSesion(user:string,pass:string){
    return(this.regUser == user && this.regPass == pass)

  }
}
