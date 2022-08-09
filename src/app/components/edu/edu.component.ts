import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/model/educacion';
import { Persona } from 'src/app/model/persona';
import { DefaultImagesService } from 'src/app/services/default-images.service';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.css']
})
export class EduComponent implements OnInit {
  edu: any[] = [];

  url: string = 'educaciones';
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
        lugar: ['', [Validators.required, Validators.maxLength(50)]],
        titulo: ['', [Validators.required, Validators.maxLength(50)]],
        descripcion: ['', [Validators.maxLength(250)]],
        startDate: ['', [Validators.required, Validators.maxLength(50)]],
        endDate: ['', [Validators.required, Validators.maxLength(50)]],
        imgBool: [false, [Validators.required]],
        img: ['', [Validators.required, Validators.maxLength(255)]]
      })
  }

  ngOnInit(): void {
    this.dataLoad()
  }

  get Lugar() {
    return this.form.get('lugar')
  }
  get Titulo() {
    return this.form.get('titulo')
  }
  get Descripcion() {
    return this.form.get('descripcion')
  }
  get StartDate() {
    return this.form.get('startDate')
  }
  get EndDate() {
    return this.form.get('endDate')
  }
  get Img() {
    return this.form.get('img')
  }
  get ImgBool() {
    return this.form.get('imgBool')
  }


  dataLoad() {
    this.json.getbyID('personas',this.json.PersonaID).subscribe((personaD) =>
      this.persona = personaD
    )
    this.json.getByPersonaID(this.url).subscribe((eduD: any) => {
      this.edu = eduD
    })
  }

  onAdd() {
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd() {
    const educacion  = new Educacion
    this.unoIgualADos(educacion, this.form.value)
    educacion.persona = this.persona
    this.json.addItem(this.url, educacion).subscribe((newItem) => {
      this.edu.push(newItem);
    });
  }

  onDelete(item: any) {
    this.json.deleteItem(this.url, item).subscribe((x) => [
      this.edu = this.edu.filter((s) => s.id !== x)
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
    this.form.markAllAsTouched();
    this.setValue()
  }

  saveEdit() {
    this.unoIgualADos(this.editItem, this.form.value)
    this.json.updateItem(this.url, this.editItem).subscribe();
  }

  cancel() {
    this.addMode = false
    this.editMode = false
  }

  setValue() {
    this.form.markAsUntouched();
    this.form.setValue({
      lugar: this.editItem.lugar,
      titulo: this.editItem.titulo,
      descripcion: this.editItem.descripcion,
      startDate: this.editItem.startDate,
      endDate: this.editItem.endDate,
      imgBool: this.editItem.imgBool,
      img: this.editItem.img,
    })
  }

  setDefault() {
    this.form.setValue({
      lugar: '',
      titulo: '',
      descripcion: '',
      startDate: '',
      endDate: '',
      imgBool: false,
      img: this.defaultimg.educacion,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  unoIgualADos(item1: any, item2: any) {
    item1.lugar = item2.lugar;
    item1.titulo = item2.titulo;
    item1.descripcion = item2.descripcion;
    item1.startDate = item2.startDate;
    item1.endDate = item2.endDate;
    item1.img = item2.img;
    item1.imgBool = item2.imgBool;
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