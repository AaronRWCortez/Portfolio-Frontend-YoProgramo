import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faXmark,faPencil,faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proj:any [] = [];

  url: string = 'proyectos';

  
  adminSesion:boolean = false;
  subscription?:Subscription;
  
  addMode:boolean = false;
  editMode:boolean = false;

  editItem:any;
  
  titulo:string='';
  fecha:string='';
  descripcion:string='';
  img:string = "../assets/images/portPrj.png";
  enlace:string = "#"

  faXmark = faXmark
  faPencil = faPencil
  faPlus = faPlusCircle


  constructor(private json: JsonService, private uiService:UiService, private modalService: NgbModal) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.dataLoad()
  }

  dataLoad(){
    this.json.getJson(this.url).subscribe((projD:any)=>{
      this.proj = projD
    })
  }


  onAdd(){
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }


  saveAdd(){
    const {titulo,fecha,descripcion,img,enlace} = this;
    const newItem = {titulo,fecha,descripcion,img,enlace}
    this.json.addItem(this.url,newItem).subscribe((newItem)=>{
      this.proj.push(newItem);
    });
  }

  onDelete(item:any){
    this.json.deleteItem(this.url,item).subscribe((x)=>[
        this.proj = this.proj.filter( (s) => s.id !== x)
      ])
  }

  open(content:any) {
    this.modalService.open(content);
  }
  openEdit(item:any,content:any){
    this.onEdit(item);
    this.open(content);
  }

  openAdd(content:any){
    this.onAdd();
    this.open(content);
  }

  onEdit(item:any){
    this.editItem = item
    this.unoIgualADos(this,item)
    this.addMode = false
    this.editMode = true
  }

  saveEdit(){
    this.unoIgualADos(this.editItem,this)
    this.json.updateItem(this.url,this.editItem).subscribe();
  }

  cancel(){
    this.addMode = false
    this.editMode = false
  }

  setDefault(){
    this.titulo = '';
    this.fecha = '';
    this.descripcion = '';
    this.img = "../assets/images/portPrj.png";
  }

  unoIgualADos(item1:any,item2:any){
    item1.titulo = item2.titulo;
    item1.fecha = item2.fecha;
    item1.descripcion = item2.descripcion;
    item1.enlace = item2.enlace;
    item1.img = item2.img;
  }
}
