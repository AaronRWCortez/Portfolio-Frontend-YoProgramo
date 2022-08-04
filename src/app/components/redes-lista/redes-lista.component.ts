import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { faXmark,faPencil,faPlusCircle, faTrash, faFloppyDisk, faEye,faEyeSlash, faGear, faList, faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { isNgTemplate } from '@angular/compiler';
import { Persona } from 'src/app/model/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RedSocial } from 'src/app/model/redSocial';
import { DefaultImagesService } from 'src/app/services/default-images.service';


@Component({
  selector: 'app-redes-lista',
  templateUrl: './redes-lista.component.html',
  styleUrls: ['./redes-lista.component.css']
})

export class RedesListaComponent implements OnInit {
  @Output() updateEvent = new EventEmitter<any>();

  sendUpdate() {
    this.updateEvent.emit(this.redes);
  }

  

  faXmark = faXmark
  faPencil = faPencil
  faPenToSquare = faPenToSquare
  faPlus = faPlusCircle
  faTrash = faTrash
  faFloppyDisk = faFloppyDisk
  faGear = faGear
  faList = faList

  adminSesion :boolean = false;
  url: string = 'redes-sociales';
  persona!: Persona;

  addMode = false
  editMode = false
  editItem!: RedSocial;
  itemID = undefined;


  redes:any = [];
  form: FormGroup;
  opcion = '';

  constructor(private json: JsonService, private uiService: UiService, private modalService: NgbModal, private formBuilder: FormBuilder, private defaultimg : DefaultImagesService) {
    this.form = formBuilder.group(
      {
        titulo: ['', [Validators.required, Validators.maxLength(50)]],
        enlace: ['', [Validators.required, Validators.maxLength(250)]],
        img: ['', [Validators.required, Validators.maxLength(255)]],
      })
  }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  get Titulo() {
    return this.form.get('titulo')
  }
  get Enlace() {
    return this.form.get('enlace')
  }
  get Img() {
    return this.form.get('img')
  }

  dataLoad() {
    this.json.getbyID('personas', this.json.PersonaID).subscribe((personaD) =>
      this.persona = personaD
    )
    this.json.getByPersonaID(this.url).subscribe((redesD: any) => {
      this.redes = redesD
    })
  }

  onAdd() {
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd() {
    const redSocial = new RedSocial
    this.unoIgualADos(redSocial, this.form.value)
    redSocial.persona = this.persona
    console.log(redSocial)
    this.json.addItem(this.url, redSocial).subscribe((newItem) => {
      this.redes.push(newItem);
      this.modeNull()
    });
  }

  open(content:any) {
    this.modalService.open(content);
  }

  modeNull(){
    this.addMode = false
    this.editMode = false
    this.setDefault()
  }


  onEdit(item:any){
    this.addMode = false
    this.editMode = true
    this.editItem = item;
    this.itemID = item.id
    this.setValue()
  }

  saveEdit(){
    this.unoIgualADos(this.editItem,this.form.value)
    this.json.updateItem(this.url,this.editItem).subscribe();
    this.modeNull()
  }

  onDelete(item:any){
    this.json.deleteItem(this.url,item).subscribe((x)=>{
        this.redes = this.redes.filter( (s:any) => s.id !== x)
        this.sendUpdate()
      })
  }

  setValue() {
    this.form.markAsUntouched();
    this.form.setValue({
      titulo: this.editItem.titulo,
      enlace: this.editItem.enlace,
      img: this.editItem.img
    })
  }

  cancel(){
    this.itemID = undefined
    this.opcion = ''
  }

  setDefault(){
    this.itemID = undefined
    this.form.setValue({ 
      titulo : '',
      enlace : '',
      img : this.defaultimg.redSocial
    }); 
  ;
  this.form.markAsPristine();
  this.form.markAsUntouched();
  }

  unoIgualADos(item1:any,item2:any){
    item1.titulo = item2.titulo;
    item1.enlace = item2.enlace;
    item1.img = item2.img;
  }

  
  opcionIgualA(val: string) {
    this.opcion = val;
  }



  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      switch (this.opcion) {
        case 'edit':
          this.saveEdit();
          break
        case 'add':
          this.saveAdd();
          break
      }
      this.sendUpdate()
      this.cancel();

    }

    else {
      this.form.markAllAsTouched();
    }
  }
}