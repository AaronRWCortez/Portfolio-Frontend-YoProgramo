import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UiService {
  private adminSesion!:boolean;
  private subject = new Subject<any>();
  authList! : string[] 

  constructor() { }

  adminSesionOn(){
    this.adminSesion = true;
    this.subject.next(this.adminSesion)
  }

  adminSesionOff(){
    this.adminSesion = false;
    this.subject.next(this.adminSesion)
  }

  getAdminSesion(){
    return this.adminSesion
  }
 
  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
}
