import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  faPencil = faPencil

  data:any;
  url: string = 'personas';
  enlace: string = "../../../assets/images/banner.jpg"
  userID = 1;

  adminSesion= false;
  subscription?:Subscription;

  form:FormGroup;

  constructor(private json: JsonService,private uiService:UiService, private modalService: NgbModal, private formBuilder: FormBuilder) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
    this.form = formBuilder.group(
      {
        nombre: [[Validators.required]],
      })
  }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  get Enlace(){
    return this.form.get('enlace')
  }

  open(content:any) {
    this.modalService.open(content);
  }

  dataLoad(){
    this.userID = this.json.PersonaID
    this.json.getbyID(this.url,this.userID).subscribe((res:any)=>{
      this.data = res
      this.enlace = this.data.banner
    })
  }

  saveEdit(){
    this.data.banner = this.enlace
    this.json.updateItem(this.url,this.data).subscribe();
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
