import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faPen, faCheck, faX, faSortNumericDownAlt } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/Persona';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  postId: any;
  @Input() isLogged: boolean = false;
  faPen = faPen;
  faCheck = faCheck;
  faX = faX;
  editarImagenPrincipal: boolean = false;
  editarImagenPerfil: boolean = false;
  editarNombre: boolean = false;
  editarAcercaDe: boolean = false;
  text: string = "";
  campoeditable = new FormControl('');
  
  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {

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
      return false;
  }
  editimagenprincipal() {
    this.campoeditable.setValue(this.datospersona.urlImagenPortada)
    this.editarImagenPrincipal = true;

  }
  EditarImagenPrincipal() {
    let datospersonamodificados: Persona = this.datospersona;
    datospersonamodificados.urlImagenPortada = this.campoeditable.value;
      this.http.put<Persona>('http://localhost:8080/editar/persona/', datospersonamodificados)
      .subscribe(data => this.datospersona = data);
      this.editarImagenPrincipal = false;
  
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