import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExpComponent } from './components/exp/exp.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';
import { EduComponent } from './components/edu/edu.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AcercaDeComponent,
    SkillsComponent,
    ExpComponent,
    EduComponent,
    ProyectosComponent,
    FooterComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      "backgroundGradientStopColor": "#faf200",
      "backgroundOpacity": 1,
      "backgroundPadding": 5,
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 8,
      "outerStrokeColor": "#ff3300",
      "outerStrokeGradientStopColor": "#ff9500",
      "innerStrokeColor": "#ffffff",
      "innerStrokeWidth": 7,
      "imageSrc": "../assets/html.png",
      "imageHeight": 75,
      "imageWidth": 75,
      "showImage": true,
      "showBackground": false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
