import { Injectable } from '@angular/core';
/* importar el HttpClient aqui y ademas HttpModule en app module.ts*/
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http : HttpClient) { }
  /* se invoca en el constructor */

  getJson(url:string){
    return this.http.get(url)
    /* mediante el metodo get a traves del http se accede a la url */
  }
}
