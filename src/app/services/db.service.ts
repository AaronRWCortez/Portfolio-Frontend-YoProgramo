import { Injectable } from '@angular/core';
/* importar el HttpClient aqui y ademas HttpModule en app module.ts*/
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  apiUrl: string = 'http://localhost:8080';

  constructor(private http : HttpClient) { }
  /* se invoca en el constructor */

  getData(list:any): Observable<unknown>{
    const url = `${this.apiUrl}/${list}/traer`
    return this.http.get(url);
  }

  deleteItem(list:any,item:any){
    const url = `${this.apiUrl}/${list}/borrar/${item.id}` 
    return this.http.delete(url);
  }
  
  updateItem(list:any,item: any){
    const url = `${this.apiUrl}/${list}/editar/${item.id}` 
    return this.http.put(url, item);
  }
  
  addItem(list:any,item:any): Observable<unknown>{
    const url = `${this.apiUrl}/${list}/crear`
    return this.http.post(url, item);
  }
}
