import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  data:any;
  url: string = 'http://localhost:3000/info';
  constructor(private json: JsonService) { }

  ngOnInit(): void {
    this.dataLoad()
  }

  dataLoad(){
    this.json.getJson(this.url).subscribe((res:any)=>{
      this.data = res
    })
  }


}
