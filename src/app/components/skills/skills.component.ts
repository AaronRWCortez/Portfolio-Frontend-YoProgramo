import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills: any [] = [];
  value = 85;

  constructor(private _service:CommonService) { 
    this.skills = _service.traerSkills()
  }

  ngOnInit(): void {
  }

}
