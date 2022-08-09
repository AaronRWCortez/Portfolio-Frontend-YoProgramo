import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faXmark,faPencil,faPlusCircle,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/model/proyecto';
import { Persona } from 'src/app/model/persona';
import { DefaultImagesService } from 'src/app/services/default-images.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proj:any [] = [];

  url: string = 'proyectos';
  persona!: Persona;

  
  adminSesion: boolean = false;
  subscription?: Subscription;

  editItem: any;
  addMode: boolean = false;
  editMode: boolean = false;

  faTrash = faTrash
  faPencil = faPencil
  faPlus = faPlusCircle

  form: FormGroup;
  opcion = '';

  constructor(private json: JsonService, private uiService: UiService, private modalService: NgbModal, private formBuilder: FormBuilder, private defaultimg : DefaultImagesService) {
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
    this.form = formBuilder.group(
      {
        titulo: ['', [Validators.required, Validators.maxLength(50)]],
        fecha: ['', [Validators.required, Validators.maxLength(50)]],        
        descripcion: ['', [Validators.maxLength(250)]],
        enlace: ['', [Validators.required, Validators.maxLength(250)]],
        img: [defaultimg.proyecto, [Validators.required, Validators.maxLength(255)]]
      })
  }

  ngOnInit(): void {
    this.dataLoad()
  }


  get Titulo() {
    return this.form.get('titulo')
  }
  get Fecha() {
    return this.form.get('fecha')
  }
  get Descripcion() {
    return this.form.get('descripcion')
  }
  get Enlace() {
    return this.form.get('enlace')
  }
  get Img() {
    return this.form.get('img')
  }


  dataLoad() {
    this.json.getbyID('personas',this.json.PersonaID).subscribe((personaD) =>
      this.persona = personaD
    )
    this.json.getByPersonaID(this.url).subscribe((projD: any) => {
      this.proj = projD
    })
  }

  onAdd() {
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd() {
    const proyecto  = new Proyecto
    this.unoIgualADos(proyecto, this.form.value)
    proyecto.persona = this.persona
    console.log(proyecto)
    this.json.addItem(this.url, proyecto).subscribe((newItem) => {
      this.proj.push(newItem);
    });
  }

  onDelete(item: any) {
    this.json.deleteItem(this.url, item).subscribe((x) => [
      this.proj = this.proj.filter((s) => s.id !== x)
    ])
  }

  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(item: any, content: any) {
    this.onEdit(item);
    this.open(content);
  }

  openAdd(content: any) {
    this.onAdd();
    this.open(content);
  }

  onEdit(item: any) {
    this.editItem = item
    this.opcion = 'edit'
    this.form.markAllAsTouched();
    this.setValue()
  }

  saveEdit() {
    this.unoIgualADos(this.editItem, this.form.value)
    this.json.updateItem(this.url, this.editItem).subscribe();
    console.log(this.editItem)
  }

  cancel() {
    this.addMode = false
    this.editMode = false
  }

  setValue() {
    this.form.markAsUntouched();
    this.form.setValue({
      titulo: this.editItem.titulo,
      fecha: this.editItem.fecha,
      descripcion: this.editItem.descripcion,
      enlace: this.editItem.enlace,
      img: this.editItem.img,
    })
  }

  setDefault() {
    this.form.setValue({
      titulo: '',
      fecha: '',
      descripcion: '',
      enlace: '',
      img: this.defaultimg.proyecto,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  unoIgualADos(item1: any, item2: any) {
    item1.titulo = item2.titulo
    item1.fecha = item2.fecha
    item1.descripcion = item2.descripcion
    item1.enlace = item2.enlace
    item1.img = item2.img
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
          this.modalService.dismissAll('Editado');
          break
        case 'add':
          this.saveAdd();
          this.modalService.dismissAll('Añadido');
          break
      }


    }
    else {
      this.form.markAllAsTouched();
    }
  }
}