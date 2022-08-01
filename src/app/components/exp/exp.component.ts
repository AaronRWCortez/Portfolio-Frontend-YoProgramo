import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faTrash,faPencil,faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
  exp:any [] = [];

  url: string = 'experiencias';

  lugar:string = '';
  puesto:string = '';
  descripcion:string = '';
  startDate:string = '';
  endDate:string = '';
  imgBool:boolean = false;
  img:string = "https://i.pinimg.com/564x/0e/dd/c0/0eddc09b2b699c507a6cafd30151ceee.jpg";

  adminSesion:boolean = false;
  subscription?:Subscription;

  editItem:any;
  addMode:boolean = false;
  editMode:boolean = false;

  faTrash= faTrash
  faPencil = faPencil
  faPlus = faPlusCircle


  constructor(private json: JsonService, private uiService:UiService, private modalService: NgbModal) { 
  }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }
  

  dataLoad(){
    this.json.getByPersonaID(this.url).subscribe((expD:any)=>{
      this.exp = expD
    })
  }

  onAdd(){
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd(){
    const {lugar,puesto,descripcion,startDate,endDate,img} = this;
    const newItem = {lugar,puesto,descripcion,startDate,endDate,img}
    this.json.addItem(this.url,newItem).subscribe((newItem)=>{
      this.exp.push(newItem);
    });
  }

  onDelete(item:any){
    this.json.deleteItem(this.url,item).subscribe((x)=>[
        this.exp = this.exp.filter( (s) => s.id !== x)
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
    console.log("estas editando el item "+ item.id)
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
    this.lugar = '';
    this.puesto = '';
    this.descripcion = '';
    this.startDate = '';
    this.endDate = '';
    this.img = "https://i.pinimg.com/564x/0e/dd/c0/0eddc09b2b699c507a6cafd30151ceee.jpg";
  }

  unoIgualADos(item1:any,item2:any){
    item1.lugar = item2.lugar;
    item1.puesto = item2.puesto;
    item1.descripcion = item2.descripcion;
    item1.startDate = item2.startDate;
    item1.endDate = item2.endDate;
    item1.img = item2.img;
  }
}