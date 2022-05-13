import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
  exp:any [] = [];

  url: string = 'http://localhost:3000/exp';

  lugar:string = '';
  puesto:string = '';
  descripcion:string = '';
  startDate:string = '';
  endDate:string = '';
  imgBool:boolean = false;
  img:string = "../../../assets/images/APicon.png";

  adminSesion:boolean = false;
  subscription?:Subscription;

  editItem:any;
  addMode:boolean = false;
  editMode:boolean = false;


  constructor(private json: JsonService, private uiService:UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.dataLoad()
  }
  

  dataLoad(){
    this.json.getJson(this.url).subscribe((expD:any)=>{
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
    this.json.deleteItem(this.url,item)
    .subscribe(
      ()=>[
      this.exp = this.exp.filter( (s) => s.id !== item.id)
    ])
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
    this.setDefault()
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
  }

  unoIgualADos(item1:any,item2:any){
    item1.lugar = item2.lugar;
    item1.puesto = item2.puesto;
    item1.descripcion = item2.descripcion;
    item1.startDate = item2.startDate;
    item1.endDate = item2.endDate;
  }
}