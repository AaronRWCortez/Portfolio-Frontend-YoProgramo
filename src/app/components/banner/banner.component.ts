import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultImagesService } from 'src/app/services/default-images.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  faPencil = faPencil

  data: any = {
    banner: this.defaultimg.banner,
  };
  url: string = 'personas';
  userID = 1;

  adminSesion= false;
  subscription?:Subscription;

  form:FormGroup;

  constructor(private json: JsonService,private uiService:UiService, private modalService: NgbModal, private formBuilder: FormBuilder, private defaultimg : DefaultImagesService) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
    this.form = formBuilder.group(
      {
        banner: ['',[Validators.required]],
      })
  }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  get Banner(){
    return this.form.get('Banner')
  }

  open(content:any) {
    this.setValue()
    this.modalService.open(content);
  }

  dataLoad() {
    this.userID = this.json.PersonaID
    this.json.getbyID(this.url, this.userID).subscribe((res: any) => {
      this.data = res
    })
  }

  saveEdit(){
    this.data.banner = this.form.value.banner
    this.json.updateItem(this.url,this.data).subscribe((persona)=>
    this.data.banner = persona.banner
    );
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

  setValue() {
    this.form.setValue({
      banner: this.data.banner,
    });
  }

}
