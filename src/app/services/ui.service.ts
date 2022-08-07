import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';



@Injectable({
  providedIn: 'root'
})
export class UiService {
  private adminSesion!:boolean | undefined;
  private subject = new Subject<any>();
  authList! : string[] 

  constructor(private autenticacionService : AutenticacionService) { }

  isAdminLogged():void{
    this.adminSesion = this.autenticacionService.parcero
  }

  getAdminSesion(){
    return this.adminSesion
  }
 
  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
}
