import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { faCheck, faPen, faX } from '@fortawesome/free-solid-svg-icons';
import { Persona } from 'src/app/Modelos';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AppRoutingModule } from '../app-routing.module/app-routing.module';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private portfolioService: PortfolioService, private loggeado: AutenticacionService, public ruta: Router, private http: HttpClient) {
  }

  editarImagenPrincipal: boolean = false;
  campoEditablePortada = new FormControl('');
  datospersona: any;
  faPen = faPen;
  faCheck = faCheck;
  faX = faX;

  ngOnInit(): void {

    this.portfolioService.obtenerDatos().subscribe(data => {
      console.log(data);
      this.datospersona = data.persona;
    });
  }

  UsuarioLogueado() {
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
      return true;
    else
      return false;
  }

  BotonLogin() {
    if (this.UsuarioLogueado()) {
      this.loggeado.Salir();
    }
    else {
      this.ruta.navigate(['/iniciarsesion']);
    }
  }
  HabilitarEdicionImagenPrincipal() {
    this.campoEditablePortada.setValue(this.datospersona.urlImagenPortada)
    this.editarImagenPrincipal = true;
  }

  EditarImagenPrincipal() {
    let datospersonamodificados: Persona = this.datospersona;
    datospersonamodificados.urlImagenPortada = this.campoEditablePortada.value;
    this.portfolioService.editarPersona(datospersonamodificados).subscribe(data => this.datospersona = data);
    this.editarImagenPrincipal = false;
  }
  salirEdicionImagenPrincipal() {
    this.editarImagenPrincipal = false;
  }
}
