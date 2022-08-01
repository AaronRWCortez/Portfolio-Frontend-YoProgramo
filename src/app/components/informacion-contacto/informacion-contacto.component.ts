import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { faXmark,faPencil,faPlusCircle, faTrash, faFloppyDisk, faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-informacion-contacto',
  templateUrl: './informacion-contacto.component.html',
  styleUrls: ['./informacion-contacto.component.css']
})

export class InformacionContactoComponent implements OnInit {
  
  faXmark = faXmark
  faPencil = faPencil
  faPlus = faPlusCircle
  faTrash = faTrash
  faFloppyDisk = faFloppyDisk
  faEye = faEye
  faEyeSlash = faEyeSlash

  adminSesion :boolean = false;
  url: string = 'infoContacto';
  addMode = false
  editMode = false

  editItem = 
  { id : undefined,
    nombre : null,
    valor : null,
    visibilidad : true
  }; ; 
  nombre:string = '';
  valor:string = '';


  infoC:any = [];


  constructor(private json: JsonService,private uiService:UiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  dataLoad(){
    this.json.getByPersonaID(this.url).subscribe((infoCD:any)=>{
      this.infoC = infoCD
    })
  }

  open(content:any) {
    this.modalService.open(content);
  }

  modeNull(){
    this.addMode = false
    this.editMode = false
    this.setDefault()
  }

  onAdd(){
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd(){
    this.json.addItem(this.url,this.editItem).subscribe((Item)=>{
      this.infoC.push(Item);
    });
    this.modeNull()
    }
  

  onEdit(item:any){
    this.addMode = false
    this.editMode = true
    this.editItem = item;
  }

  saveEdit(){
    this.json.updateItem(this.url,this.editItem).subscribe();
    this.modeNull()
  }

  onDelete(item:any){
    this.json.deleteItem(this.url,item).subscribe((x)=>[
        this.infoC = this.infoC.filter( (s:any) => s.id !== x)
      ])
  }


  setDefault(){
    this.editItem = 
    { id : undefined,
      nombre : null,
      valor : null,
      visibilidad : true
    }; 
  }

  cambioV(item:any){
    this.editItem = item;
    this.editItem.visibilidad = !this.editItem.visibilidad
    this.json.updateItem(this.url,this.editItem).subscribe();
    this.modeNull()
  } 

  unoIgualADos(item1:any,item2:any){
    item1.nombre = item2.nombre;
    item1.descripcion = item2.descripcion;
    item1.startDate = item2.startDate;
  }

}
