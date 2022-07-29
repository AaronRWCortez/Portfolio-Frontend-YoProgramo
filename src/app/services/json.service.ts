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
export class JsonService {
  apiUrl: string = 'http://localhost:8080';

  constructor(private http : HttpClient) { }
  /* se invoca en el constructor */

  getJson(list:any): Observable<any[]>{
    const url = `${this.apiUrl}/${list}/traer`
    return this.http.get<any[]>(url)
  }

  getbyID(list:any,id:any): Observable<any>{
    const url = `${this.apiUrl}/${list}/traer/${id}`
    return this.http.get<any>(url)
  }


  deleteItem(list:any,item:any): Observable<any>{
    const url = `${this.apiUrl}/${list}/borrar/${item.id}` 
    return this.http.delete<any>(url)
  }
  
  updateItem(list:any,item: any): Observable<any>{
    const url = `${this.apiUrl}/${list}/editar/${item.id}`    
    return this.http.put<any>(url, item)
  }
  
  addItem(list:any,item:any): Observable<any>{
    const url = `${this.apiUrl}/${list}/crear`    
    return this.http.post<any>(url, item)
  }

}