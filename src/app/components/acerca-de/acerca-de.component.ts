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
  placeHolder =  "../../../assets/images/placeholder.png"
  
  info:any = {
    apellido: "",
    descripcion: "",
    img: "../../../assets/images/PH.png",
    localidad: "",
    nombre: "",
    titulo: "",
  };
  url: string = 'personas';
  userID: number = 1;
  nombre: string  = '';
  apellido: string  = '';
  titulo: string  = '';
  localidad: string ='';
  descripcion: string ='';
  img : string ="";

  editItem:any = '';

  adminSesion = true;
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
    this.json.getbyID(this.url,this.userID).subscribe((res:any)=>{
      this.info = res
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
    item1.localidad = item2.localidad;
    item1.descripcion = item2.descripcion;
    item1.img = item2.img;
  }

}
