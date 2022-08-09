import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/services/auth.service';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { DefaultImagesService } from 'src/app/services/default-images.service';

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
    private modalService: NgbModal, 
    private authService:AuthService, private router :Router,
    private formBuilder: FormBuilder, private defaultimg : DefaultImagesService ) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);

    this.form = formBuilder.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required]]

      })
  }

  ngOnInit(): void {
    this.dataLoad()
  }

  dataLoad(){
    this.json.getByPersonaID(this.url).subscribe((red:any)=>{
      this.redes = red
    })
  }


  open(content:any) {
    this.modalService.open(content);
  }


  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.form.value.username, this.form.value.password); 
    this.authService.login(this.loginUsuario).subscribe(() => {
        this.isLogged = true;
        this.isLogginFail = false;
        this.modalService.dismissAll('Sesion');
        this.uiService.adminSesionOn()
      }, err =>{
        this.isLogged = false;
        this.isLogginFail = true;
        this.errorMsj = err.error.message;
        this.uiService.adminSesionOff()

      }
    )
  }

  onLogOut():void{
    this.uiService.adminSesionOff()
  }

  restartLogData(){
    this.isLogged = false;
    this.isLogginFail = false;
    this.setDefault()
  }

  setDefault() {
    this.form.setValue({
      nombreUsuario: '',
      password: '',
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  onEnviar(event:Event){
    event.preventDefault;
    if(this.form.valid){
      this.onLogin();
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
