import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


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

  constructor(private json: JsonService,private uiService:UiService, private modalService: NgbModal) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.adminSesion = this.uiService.getAdminSesion()
    this.dataLoad()
  }

  open(content:any) {
    this.modalService.open(content);
  }

  dataLoad(){
    this.json.getbyID(this.url,this.userID).subscribe((res:any)=>{
      this.data = res
      this.enlace = this.data.banner
      console.log(res)
    })
  }

  saveEdit(){
    this.data.banner = this.enlace
    this.json.updateItem(this.url,this.data).subscribe();
  }

}
