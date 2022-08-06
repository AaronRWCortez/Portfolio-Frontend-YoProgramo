import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [
  {path:'portfolio',component:PortfolioComponent},
  {path:'',redirectTo:'portfolio',pathMatch:'full'},
  {path:'**',redirectTo:'portfolio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
