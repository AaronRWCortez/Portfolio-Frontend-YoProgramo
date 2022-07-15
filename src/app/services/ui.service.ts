import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UiService {
  private adminSesion:boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleEditMode():void{
    this.adminSesion = !this.adminSesion;
    this.subject.next(this.adminSesion);
  }
 
  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
}
