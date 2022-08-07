import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { LoginUsuario } from 'src/app/model/login-usuario';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { DefaultImagesService } from 'src/app/services/default-images.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  form:FormGroup;
  faAlert = faTriangleExclamation;

  updateList(newItem: any) {
    this.redes = newItem;
    console.log(this.redes)
  }
  logoAP = this.defaultimg.logoAP
  redes:any [] = [];

  url: string = 'redes-sociales';

  adminSesion:boolean = false;
  subscription?:Subscription;
  isLogged = false;
  isLogginFail = false;
  loginUsuario! :LoginUsuario;
  roles!: string[];
  errorMsj!: string;
  constructor(
    private json: JsonService, private uiService:UiService, 
    private modalService: NgbModal , private tokenService:TokenService, 
    private autenticacionService:AutenticacionService, private router :Router,
    private formBuilder: FormBuilder, private defaultimg : DefaultImagesService ) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);

    this.form = formBuilder.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required]]

      })
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
    this.json.getByPersonaID(this.url).subscribe((red:any)=>{
      this.redes = red
    })
  }


  open(content:any) {
    this.modalService.open(content);
  }


  onLogOut():void{
    this.autenticacionService.logoutUser()
    window.location.reload()
  }

  restartLogData(){
    this.isLogged = false;
    this.isLogginFail = false;
    this.setDefault()
  }

  setDefault() {
    this.form.setValue({
      username: '',
      password: '',
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  onEnviar(event:Event){
    event.preventDefault;
    if(this.form.valid){
      this.autenticacionService
      .IniciarSesion(this.form.value)
      .subscribe((data) => {
        this.isLogged = true;
        this.modalService.dismissAll('Sesion');
        window.location.reload();
      },
      err =>{
        this.isLogged = false;
        this.isLogginFail = true;
      }
      )
;
    }
    else{
      this.form.markAllAsTouched();
    }
  }

  get Username(){
    return this.form.get('username')
  }

  get Password(){
    return this.form.get('password')
  }

  update(val:any){
    console.log('desde header')
    console.log(val)
    this.redes = val
  }

}
