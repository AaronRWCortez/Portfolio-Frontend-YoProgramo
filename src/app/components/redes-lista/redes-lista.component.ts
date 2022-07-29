import { Component, OnInit } from '@angular/core';
import { faGear,faXmark,faPencil,faPlusCircle, faTrash, faFloppyDisk} from '@fortawesome/free-solid-svg-icons';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-redes-lista',
  templateUrl: './redes-lista.component.html',
  styleUrls: ['./redes-lista.component.css']
})
export class RedesListaComponent implements OnInit {
  faGear = faGear
  faXmark = faXmark
  faPencil = faPencil
  faPlus = faPlusCircle
  faTrash = faTrash
  faFloppyDisk = faFloppyDisk


  adminSesion :boolean = false;
  url: string = 'redes-sociales';
  addMode = false
  editMode = false

  editItem = 
  { id : undefined,
    enlace : null,
    img : null,
    titulo : null,
  };
  enlace : string = "";
  img : string = "";
  titulo : string = "";


  redes:any = [];


  constructor(private json: JsonService,private uiService:UiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  dataLoad(){
    this.json.getJson(this.url).subscribe((redesD:any)=>{
      this.redes = redesD
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
      this.redes.push(Item);
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
        this.redes = this.redes.filter( (s:any) => s.id !== x)
      ])
  }


  setDefault(){
    this.editItem = 
    { id : undefined,
      enlace : null,
      img : null,
      titulo : null,
    }; 
  }

  saveChanges(){
    window.location.reload()
  }
}