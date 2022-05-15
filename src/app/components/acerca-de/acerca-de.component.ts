import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  data:any;
  url: string = 'http://localhost:3000/info';

  nombre = '';
  apellido = '';
  titulo = '';
  lugar='';
  descripcion='';
  img="";

  editItem:any = '';

  adminSesion= false;
  subscription?:Subscription;

  constructor(private json: JsonService,private uiService:UiService, private modalService: NgbModal) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }
  ngOnInit(): void {
    this.dataLoad()
  }

  open(content:any) {
    this.modalService.open(content);
  }
  openEdit(item:any,content:any){
    this.onEdit(item);
    this.open(content);
  }

  dataLoad(){
    this.json.getJson(this.url).subscribe((res:any)=>{
      this.data = res
    })
  }

  onEdit(item:any){
    console.log("estas editando el item "+ item.id)
    this.editItem = item
    this.unoIgualADos(this,item)
  }

  saveEdit(){
    this.unoIgualADos(this.editItem,this)
    this.json.updateItem(this.url,this.editItem).subscribe();
  }


  unoIgualADos(item1:any,item2:any){
    item1.nombre = item2.nombre;
    item1.apellido = item2.apellido;
    item1.titulo = item2.titulo;
    item1.lugar = item2.lugar;
    item1.descripcion = item2.descripcion;
    item1.img = item2.img;
  }

}
