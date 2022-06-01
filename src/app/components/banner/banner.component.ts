import { Component, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  data:any;
  url: string = 'http://localhost:3000/banner';
  link: string = ''

  editItem:any = '';

  adminSesion= false;
  subscription?:Subscription;

  constructor(private json: JsonService,private uiService:UiService, private modalService: NgbModal) { 
    this.subscription = this.uiService.onToggle().subscribe(v => this.adminSesion = v);
  }

  ngOnInit(): void {
    /*this.dataLoad()*/
  }

  open(content:any) {
    this.modalService.open(content);
  }
  openEdit(item:any,content:any){
    this.onEdit(item);
    this.open(content);
  }

  dataLoad(){
    this.json.getJson(this.url).subscribe((res:any)=>{
      this.data = res
    })
  }

  onEdit(item:any){
    this.editItem = item
    this.unoIgualADos(this,item)
  }

  saveEdit(){
    this.unoIgualADos(this.editItem,this)
    this.json.updateItem(this.url,this.editItem).subscribe();
  }


  unoIgualADos(item1:any,item2:any){
    item1.link = item2.link;
  }

}
