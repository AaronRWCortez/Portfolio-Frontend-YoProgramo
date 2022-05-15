import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  redes:any [] = [];
  
  logos:any [] = [];

  urlL: string = 'http://localhost:3000/logos';
  urlR: string = 'http://localhost:3000/redes';

  adminSesion:boolean = false;
  subscription?:Subscription;
  
  user: string = "";
  pass: string = "";
  constructor(private json: JsonService, private uiService:UiService, private modalService: NgbModal, private _auth:AuthService) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.dataLoad()
  }

  dataLoad(){
    this.json.getJson(this.urlR).subscribe((red:any)=>{
      this.redes = red
    })
    this.json.getJson(this.urlL).subscribe((log:any)=>{
      this.logos = log
    })
  }

  toggleEditMode(){
    this.uiService.toggleEditMode();
  }

  open(content:any) {
    this.modalService.open(content);
  }

  sesionCall(){
    if(this._auth.setSesion(this.user,this.pass)){
      this.toggleEditMode()
    }
    else{
      alert("Usuario o contraseña incorrecto")
    }
    
  }

  clear(){
    this.user = '';
    this.pass = '';
  }
}
