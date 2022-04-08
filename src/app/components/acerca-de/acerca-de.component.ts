import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  about:any;
  

  constructor(private _servicio : CommonService) {
    this.about = _servicio.traerAbout()
   }

  ngOnInit(): void {
  }
  MasInfo(){
    
  }


}
