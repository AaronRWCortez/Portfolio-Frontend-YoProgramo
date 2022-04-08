import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { CommonService } from './services/common.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AcercaDeComponent,
    SkillsComponent,
    ExpComponent,
    ProyectosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
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
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
