import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  placeHolder = "../../../assets/images/placeholder.png"
  faPencil = faPencil

  info: any = {
    apellido: "",
    descripcion: "",
    img: "../../../assets/images/PH.png",
    localidad: "",
    nombre: "",
    titulo: "",
  };
  url: string = 'personas';
  userID: number = 1;
  nombre: string = '';
  apellido: string = '';
  titulo: string = '';
  localidad: string = '';
  descripcion: string = '';
  img: string = '';

  editItem: any = '';

  adminSesion = false;
  subscription?: Subscription;

  form: FormGroup;

  constructor(private json: JsonService, private uiService: UiService, private modalService: NgbModal, private formBuilder: FormBuilder) {

    this.form = formBuilder.group(
      {
        nombre: [null,[Validators.required, Validators.maxLength(50)]],
        apellido: [null,[Validators.required, Validators.maxLength(50)]],
        titulo: [null,[Validators.required, Validators.maxLength(50)]],
        localidad: [null,[Validators.required, Validators.maxLength(50)]],
        descripcion: [null,[Validators.required, Validators.maxLength(500)]],
        img: [null,[Validators.required]]
      })

  }
  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
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

  open(content: any) {
    this.modalService.open(content);
  }
  openEdit(item: any, content: any) {
    this.onEdit(item);
    this.open(content);
  }

  dataLoad() {

    this.userID = this.json.PersonaID
    this.json.getbyID(this.url, this.userID).subscribe((res: any) => {
      this.info = res
    })
  }

  onEdit(item: any) {
    this.editItem = item
    this.unoIgualADos(this, item)
  }

  saveEdit() {
    this.unoIgualADos(this.editItem, this)
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
