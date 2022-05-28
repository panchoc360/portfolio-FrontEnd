import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { IniciarSesionComponent } from '../iniciar-sesion/iniciar-sesion.component';

const routes: Routes = [
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'iniciarsesion', component: IniciarSesionComponent},
  {path: '', redirectTo:'/portfolio',pathMatch: 'full'},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
