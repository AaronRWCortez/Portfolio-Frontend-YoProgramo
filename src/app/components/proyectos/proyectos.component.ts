import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proj:any [] = []

  constructor(private _servicio:CommonService) { 
    this.proj = _servicio.traerProj()
  }

  ngOnInit(): void {
  }

}
