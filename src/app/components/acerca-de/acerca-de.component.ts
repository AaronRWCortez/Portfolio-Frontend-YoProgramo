import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultImagesService } from 'src/app/services/default-images.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  placeHolder = "../../../assets/images/placeholder.png"
  faPencil = faPencil


  url: string = 'personas';
  userID: number = 1;

  editItem: any = '';

  adminSesion = false;
  subscription?: Subscription;

  form: FormGroup;
  info: any = {
    apellido: "",
    descripcion: "",
    img: this.defaultImg.perfil,
    localidad: "",
    nombre: "",
    titulo: "",
  };
  loaded = false

  constructor(private json: JsonService, private uiService: UiService, private modalService: NgbModal, private formBuilder: FormBuilder, private defaultImg : DefaultImagesService) {

    this.form = formBuilder.group(
      {
        nombre: ['', [Validators.required, Validators.maxLength(50)]],
        apellido: ['', [Validators.required, Validators.maxLength(50)]],
        titulo: ['', [Validators.required, Validators.maxLength(50)]],
        localidad: ['', [Validators.required, Validators.maxLength(50)]],
        descripcion: ['', [Validators.required, Validators.maxLength(500)]],
        img: ['', [Validators.required]]
      })

  }


  ngOnInit(): void {
    this.dataLoad()
  }

  get Nombre() {
    return this.form.get('nombre')
  }

  get Apellido() {
    return this.form.get('apellido')
  }

  get Titulo() {
    return this.form.get('titulo')
  }

  get Localidad() {
    return this.form.get('localidad')
  }

  get Descripcion() {
    return this.form.get('descripcion')
  }

  get Img() {
    return this.form.get('img')
  }

  setValue() {
    this.form.setValue({
      apellido: this.editItem.apellido,
      descripcion: this.editItem.descripcion,
      img: this.editItem.img,
      localidad: this.editItem.localidad,
      nombre: this.editItem.nombre,
      titulo: this.editItem.titulo,
    });
  }

  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(item: any, content: any) {
    this.onEdit();
    this.open(content);
  }

  dataLoad() {
    this.userID = this.json.PersonaID
    this.json.getbyID(this.url, this.userID).subscribe((res: any) => {
      this.info = res
      this.loaded = true
    })
  }

  onEdit() {
    this.editItem = this.info
    this.form.markAllAsTouched();
    this.setValue()
  }

  saveEdit() {
    this.unoIgualADos(this.editItem, this.form.value)
    this.json.updateItem(this.url, this.editItem).subscribe();
  }


  unoIgualADos(item1: any, item2: any) {
    item1.nombre = item2.nombre;
    item1.apellido = item2.apellido;
    item1.titulo = item2.titulo;
    item1.localidad = item2.localidad;
    item1.descripcion = item2.descripcion;
    item1.img = item2.img;
  }

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.saveEdit();
      this.modalService.dismissAll('Editado');
    }
    else {
      this.form.markAllAsTouched();
    }
  }
}
