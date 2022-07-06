import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faPen, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  @Input() isLogged: boolean = false;
  faPen = faPen;
  faCheck = faCheck;
  faX = faX;
  editarImagenPrincipal: boolean = true; //cambiar a false
  editarImagenPerfil: boolean = true; //cambiar a false
  editarNombre: boolean = true; // cambiar a false
  editarAcercaDe: boolean = true; // cambiar a false
  text: string = "";

  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService) {
    //this.isLogged = loggeado.IsLogged();
  }

  datospersona: any;


  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.datospersona = data.persona;
    })
  }
  contacto() {
    console.log("contacto");
  }
  anadirSeccion() {
    console.log("añadir seccion");
  }
  UsuarioLogueado() {
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
      return true;
    else
      return true; //cambiar a false
  }
  editimagenprincipal() {
    this.editarImagenPrincipal = true;

  }
  EditarImagenPrincipal() {

  }
  salirEdicionImagenPrincipal() {
    this.editarImagenPrincipal = false;

  }
  EditarImagenPerfil() {

  }
  salirEdicionImagenPerfil() {
    this.editarImagenPerfil = false;
  }
  editimagenperfil() {
    this.editarImagenPerfil = true;
  }
  editNombre(){

  }
  salirEdicionNombre(){
    this.editarNombre = false;
  }
  HabilitarEdicionNombre(){
    this.editarNombre = true;
  }
  guardarAcercaDe(){

  }
  salirEdicionAcercaDe(){
    this.editarAcercaDe = false;
  }
  HabilitarEdicionAcercaDe(){
    this.editarAcercaDe = true;
  }
}