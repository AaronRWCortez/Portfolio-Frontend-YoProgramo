import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  url: string = 'personas';
  persona: any [] = []

  nombre:string = "";
  apellido:string = "";
  img:string = ""

  adminSesion:boolean = true;
  subscription?:Subscription;

  editItem:any;
  addMode:boolean = false;
  editMode:boolean = false;
  constructor(private db:DbService,  private uiService:UiService, private modalService: NgbModal) {
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.dataLoad()
  }

  dataLoad(){
    this.db.getData(this.url).subscribe((personaD:any)=>{
      this.persona = personaD
    })
  }

  onAdd(){
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd(){
    const {nombre,apellido,img} = this;
    const newItem = {nombre,apellido,img}
    this.db.addItem(this.url,newItem).subscribe(()=>{
      alert ("añadido")
      this.persona.push(newItem);
    });
  }

  onDelete(item:any){
    this.db.deleteItem(this.url,item).subscribe(() =>{
      this.persona = this.persona.filter( (s) => s.id !== item.id);
    })
    
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
    this.db.updateItem(this.url,this.editItem).subscribe(()=>{
      this.unoIgualADos(this.editItem,this);
      this.setDefault();
    });
  }

  cancel(){
    this.addMode = false
    this.editMode = false
  }

  setDefault(){
    this.nombre = '';
    this.apellido = '';
    this.img = '';
  }

  unoIgualADos(item1:any,item2:any){
    item1.nombre = item2.nombre;
    item1.apellido = item2.apellido;
    item1.img = item2.img;
  }
}

