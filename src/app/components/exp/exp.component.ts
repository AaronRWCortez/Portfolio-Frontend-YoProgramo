import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.css']
})
export class ExpComponent implements OnInit {
  exp:any [] = [];
  edu:any [] = [];

  constructor(private _servicio:CommonService) { 
    this.exp = _servicio.traerExp();
    this.edu = _servicio.traerEdu();
  }

  ngOnInit(): void {
  }

}
