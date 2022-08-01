import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faTrash,faPencil,faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css']
})
export class EduComponent implements OnInit {
  faTrash = faTrash
  faPencil = faPencil
  faPlus = faPlusCircle

  edu:any [] = [];

  url: string = 'educaciones';

  lugar:string = '';
  titulo:string = '';
  descripcion:string = '';
  startDate:string = '';
  endDate:string = '';
  imgBool:boolean = false;
  img:string = "https://i.pinimg.com/564x/46/be/18/46be1874b01a399d141490df509845e1.jpg";

  editItem:any;
  addMode:boolean = false;
  editMode:boolean = false;

  adminSesion:boolean = false;
  subscription?:Subscription;


  constructor(private json: JsonService, private uiService:UiService, private modalService: NgbModal) { 
  }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  dataLoad(){
    this.json.getByPersonaID(this.url).subscribe((eduD:any)=>{
      this.edu = eduD
    })
  }


  onAdd(){
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd(){
    const {lugar,titulo,descripcion,startDate,endDate,img} = this;
    const newItem = {lugar,titulo,descripcion,startDate,endDate,img}
    this.json.addItem(this.url,newItem).subscribe((newItem)=>{
      this.edu.push(newItem);
    });
  }

  onDelete(item:any){
    this.json.deleteItem(this.url,item).subscribe((x)=>[
        this.edu = this.edu.filter( (s) => s.id !== x)
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

  close(){
    this.addMode = false
    this.editMode = false

  }

  setDefault(){
    this.lugar = '';
    this.titulo = '';
    this.descripcion = '';
    this.startDate = '';
    this.endDate = '';
    this.img = "https://i.pinimg.com/564x/46/be/18/46be1874b01a399d141490df509845e1.jpg";
  }

  unoIgualADos(item1:any,item2:any){
    item1.lugar = item2.lugar;
    item1.titulo = item2.titulo;
    item1.descripcion = item2.descripcion;
    item1.startDate = item2.startDate;
    item1.endDate = item2.endDate;
    item1.img = item2.img;
  }
}