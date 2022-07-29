import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPComponent } from './components/info-p/info-p.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [
  {path:'portfolio',component:PortfolioComponent},
  {path:'informacion',component:InfoPComponent},
  {path:'',redirectTo:'portfolio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
