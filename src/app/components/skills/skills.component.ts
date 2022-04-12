import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { JsonService } from 'src/app/services/json.service'; 

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: any [] = [];
  url: string = 'http://localhost:3000/skills';

  constructor(public json: JsonService){
    this.json.getJson(this.url).subscribe((res:any)=>{
      this.skills = res
    })
  }

  ngOnInit(): void {
  }

}
