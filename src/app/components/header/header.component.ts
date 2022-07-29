import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/services/auth.service';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  redes:any [] = [];
  
  logos:any [] = [];

  urlL: string = 'logos';
  urlR: string = 'redes-sociales';

  adminSesion:boolean = false;
  subscription?:Subscription;
  isLogged = false;
  isLogginFail = false;
  loginUsuario! :LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles!: string[];
  errorMsj!: string;
  constructor(
    private json: JsonService, private uiService:UiService, 
    private modalService: NgbModal , private tokenService:TokenService, 
    private authService:AuthService, private router :Router) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    this.uiService.isAdminLogged()
    this.dataLoad()

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  dataLoad(){
    this.json.getJson(this.urlR).subscribe((red:any)=>{
      this.redes = red
    })
    this.json.getJson(this.urlL).subscribe((log:any)=>{
      this.logos = log
    })
  }


  open(content:any) {
    this.modalService.open(content);
  }


  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password); 
    this.authService.login(this.loginUsuario).subscribe(data => {
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.modalService.dismissAll('Sesion');
        window.location.reload()
      }, err =>{
        this.isLogged = false;
        this.isLogginFail = true;
        this.errorMsj = err.error.mensaje;
      }
    )
  }
  onLogOut():void{
    this.tokenService.logOut()
    window.location.reload()
  }
}
