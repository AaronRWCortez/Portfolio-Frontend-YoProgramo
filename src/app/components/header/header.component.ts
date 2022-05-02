import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

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
  
  constructor(private json: JsonService, private uiService:UiService) { 
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
}
