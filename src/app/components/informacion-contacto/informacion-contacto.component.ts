import { Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { faXmark,faPencil,faPlusCircle, faTrash, faFloppyDisk, faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { isNgTemplate } from '@angular/compiler';
import { Persona } from 'src/app/model/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoContacto } from 'src/app/model/infoContacto';
import { Subscription } from 'rxjs';


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
  subscription?: Subscription;
  url: string = 'infoContacto';
  persona!: Persona;

  addMode = false
  editMode = false
  editItem!: InfoContacto;
  itemID = undefined;

  nombre:string = '';
  valor:string = '';


  infoC:any = [];
  form: FormGroup;
  opcion = '';

  constructor(private json: JsonService, private uiService: UiService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
    this.form = formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        valor: ['', [Validators.required, Validators.maxLength(50)]],
      })
  }

  ngOnInit(): void {
    this.dataLoad()
  }

  get Nombre() {
    return this.form.get('nombre')
  }
  get Valor() {
    return this.form.get('valor')
  }

  dataLoad() {
    this.json.getbyID('personas', this.json.PersonaID).subscribe((personaD) =>
      this.persona = personaD
    )
    this.json.getByPersonaID(this.url).subscribe((infoCD: any) => {
      this.infoC = infoCD
    })
  }

  onAdd() {
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd() {
    const infoContacto = new InfoContacto
    this.unoIgualADos(infoContacto, this.form.value)
    infoContacto.persona = this.persona
    infoContacto.visibilidad = true
    console.log(infoContacto)
    this.json.addItem(this.url, infoContacto).subscribe((newItem) => {
      this.infoC.push(newItem);
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
    this.json.deleteItem(this.url,item).subscribe((x)=>[
        this.infoC = this.infoC.filter( (s:any) => s.id !== x)
      ])
  }

  setValue() {
    this.form.markAsUntouched();
    this.form.setValue({
      nombre: this.editItem.nombre,
      valor: this.editItem.valor
    })
  }

  cancel(){
    this.itemID = undefined
    this.opcion = ''
  }

  setDefault(){
    this.itemID = undefined
    this.form.setValue({ 
      nombre : '',
      valor : ''
    }); 
  ;
  this.form.markAsPristine();
  this.form.markAsUntouched();
  }

  cambioV(item:any){
    this.editItem = item;
    this.editItem.visibilidad = !this.editItem.visibilidad
    this.json.updateItem(this.url,this.editItem).subscribe();
    this.modeNull()
  } 

  unoIgualADos(item1:any,item2:any){
    item1.nombre = item2.nombre;
    item1.valor = item2.valor;
  }

  
  opcionIgualA(valor: string) {
    this.opcion = valor;
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
      this.cancel();


    }
    else {
      this.form.markAllAsTouched();
    }
  }
}
