import { Component, OnInit, EventEmitter } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faTrash,faPencil,faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { Skill } from 'src/app/model/skill';
import { DefaultImagesService } from 'src/app/services/default-images.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  url: string = 'skills';
  skill: any [] = [];

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

  constructor(private json: JsonService, private uiService: UiService, private modalService: NgbModal, formBuilder: FormBuilder, private defaultimg : DefaultImagesService) {
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
    this.form = formBuilder.group(
      {
        titulo: ['', [Validators.required, Validators.maxLength(50)]],
        percent: ['', [Validators.required, Validators.maxLength(50)]],
        color: ['', [Validators.required, Validators.maxLength(50)]],
        colorgr: ['', [Validators.required,Validators.maxLength(50)]],
        img: ['', [Validators.required, Validators.maxLength(255)]]
      })
  }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  get Titulo() {
    return this.form.get('titulo')
  }
  get Percent() {
    return this.form.get('percent')
  }
  get Color() {
    return this.form.get('color')
  }
  get Colorgr() {
    return this.form.get('colorgr')
  }
  get Img() {
    return this.form.get('img')
  }


  dataLoad() {
    this.json.getbyID('personas',this.json.PersonaID).subscribe((personaD) =>
      this.persona = personaD
    )
    this.json.getByPersonaID(this.url).subscribe((eduD: any) => {
      this.skill = eduD
    })
  }

  onAdd() {
    this.addMode = true
    this.editMode = false
    this.setDefault()
  }

  saveAdd() {
    const skill  = new Skill
    this.unoIgualADos(skill, this.form.value)
    skill.persona = this.persona
    this.json.addItem(this.url, skill).subscribe((newItem) => {
      this.skill.push(newItem);
    });
  }

  onDelete(item: any) {
    this.json.deleteItem(this.url, item).subscribe((x) => [
      this.skill = this.skill.filter((s) => s.id !== x)
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
    titulo : this.editItem.titulo,
    percent : this.editItem.percent,
    color : this.editItem.color,
    colorgr : this.editItem.colorgr,
    img : this.editItem.img,
    })
  }

  setDefault() {
    this.form.setValue({
    titulo : "",
    percent : 50,
    color : "#242424",
    colorgr : "#7a7a7a",
    img : this.defaultimg.skill,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
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



  unoIgualADos(item1:any,item2:any){
    item1.titulo = item2.titulo;
    item1.percent = item2.percent;
    item1.color = item2.color;
    item1.colorgr = item2.colorgr;
    item1.img = item2.img;
  }  

}
