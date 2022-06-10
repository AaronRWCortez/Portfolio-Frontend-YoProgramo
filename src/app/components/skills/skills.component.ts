import { Component, OnInit, EventEmitter } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faXmark,faPencil,faPlusCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  url: string = 'skills';
  skill: any [] = [];
  faXmark = faXmark
  faPencil = faPencil
  faPlus = faPlusCircle
  titulo: string ="";
  percent: number = 50;
  color :any = "#242424";
  colorgr :any = "#7a7a7a";
  img: string= "./assets/images/PH.png";
  editMode: boolean = false;
  addMode: boolean = false;

  adminSesion:boolean = false;
  subscription?:Subscription;

  editItem:any = "";

  constructor(private json: JsonService, private uiService:UiService, private modalService: NgbModal) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.dataLoad()
  }

  dataLoad(){
    this.json.getJson(this.url).subscribe((skillD:any)=>{
      this.skill = skillD
    })
  }


  onAdd(){
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd(){
    const {titulo,percent,color,colorgr,img} = this;
    const newItem = {titulo,percent,color,colorgr,img}
    this.json.addItem(this.url,newItem).subscribe((newItem)=>{
      this.skill.push(newItem);
    });
  }

  onDelete(item:any){
    this.json.deleteItem(this.url,item).subscribe((x)=>[
        this.skill = this.skill.filter( (s) => s.id !== x)
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
    this.titulo = "";
    this.percent = 50;
    this.color = "#242424";
    this.colorgr = "#7a7a7a";
    this.img = "./assets/images/PH.png";
  }

  unoIgualADos(item1:any,item2:any){
    item1.titulo = item2.titulo;
    item1.percent = item2.percent;
    item1.color = item2.color;
    item1.colorgr = item2.colorgr;
    item1.img = item2.img;
  }  

}
