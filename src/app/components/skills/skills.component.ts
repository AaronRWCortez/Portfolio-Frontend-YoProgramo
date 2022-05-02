import { Component, OnInit, EventEmitter } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  url: string = 'http://localhost:3000/skills';
  skills: any [] = [];

  titulo: string ="";
  percent: any = "";
  color :any = "#242424";
  colorGr :any = "#7a7a7a";
  img: string= "./assets/images/PH.png";
  editMode: boolean = false;
  addMode: boolean = false;

  adminSesion:boolean = false;
  subscription?:Subscription;

  editItem:any = "";

  constructor(private json: JsonService, private uiService:UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.dataLoad()
  }


  dataLoad(){
    this.json.getJson(this.url).subscribe((res:any)=>{
      this.skills = res
    })
  }

  onDelete(item:any){
    this.json.deleteItem(this.url,item)
    .subscribe(
      ()=>[
      this.skills = this.skills.filter( (s) => s.id !== item.id)
    ])
  }

  cancel(){
    this.addMode = false
    this.editMode = false
  }

  setDefault(){
    this.titulo = "";
    this.percent = 0;
    this.color = "#242424";
    this.colorGr = "#7a7a7a";
    this.img = "./assets/images/PH.png";
  }

  onAdd(){
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  unoIgualADos(item1:any,item2:any){
    item1.titulo = item2.titulo;
    item1.percent = item2.percent;
    item1.color = item2.color;
    item1.colorGr = item2.colorGr;
    item1.img = item2.img;
  }

  saveAdd(){
    const {titulo,percent,img,color,colorGr} = this;
    const newItem = {titulo,percent,img,color,colorGr}
    this.json.addItem(this.url,newItem).subscribe((newItem)=>{
      this.skills.push(newItem);
    });
    this.setDefault()
    this.addMode = false
  }

  onEdit(item:any){
    console.log("estas editando el item "+ item.id)
    this.editMode = true
    this.addMode = false
    this.editItem = item
    this.unoIgualADos(this,item)
  }
  
  saveEdit(){
    this.unoIgualADos(this.editItem,this)
    this.json.updateItem(this.url,this.editItem).subscribe();
    this.setDefault()
    this.editMode = false
  }
  

}
