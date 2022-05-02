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
  apiUrl: string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }
  /* se invoca en el constructor */

  getJson(url:any): Observable<any[]>{
    return this.http.get<any[]>(url)
    /* mediante el metodo get a traves del http se accede a la url */
  }

  deleteItem(list:any,item:any): Observable<any[]>{
    const url = `${list}/${item.id}` 
    return this.http.delete<any[]>(url)
  }
  
  updateItem(list:any,item: any): Observable<any[]>{
    const url = `${list}/${item.id}` 
    return this.http.put<any[]>(url, item, httpOptions)
  }
  
  addItem(list:any,item:any): Observable<any[]>{
    return this.http.post<any[]>(list, item, httpOptions)
  }
}

/*  onEdit(item:any){
    const id = item.id
    const {titulo,percent,img,color,colorGr} = this;
    const newItem = {titulo,percent,img,color,colorGr,id}
      item = newItem
      this.json.updateItem(this.url,item).subscribe();
      this.dataLoad()
  } 
  
  
  
  onEdit(){
    toggleReminder(item:Task){
    item.reminder = !item.reminder
    this.json.updateTaskReminder(item).subscribe();
  }
  */