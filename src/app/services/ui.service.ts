import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class UiService {
  private adminSesion!:boolean;
  private subject = new Subject<any>();
  authList! : string[] 

  constructor(private tokenService:TokenService) { }

  isAdminLogged():void{
    this.tokenService.getAuthorities()
    this.authList = this.tokenService.getAuthorities()
    for (var i of this.authList){
      if( i == "ROLE_ADMIN"){
        this.adminSesion = true;
        this.subject.next(this.adminSesion);
        break
      }
      else{
        this.adminSesion = false;
      }
    }
  }

  getAdminSesion(){
    return this.adminSesion
  }
 
  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
}
