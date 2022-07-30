import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faPen, faCheck, faX, faSortNumericDownAlt } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { HttpClient } from '@angular/common/http';
import { Persona } from 'src/app/Modelos';
import { FormControl} from '@angular/forms';


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
  editarImagenPerfil: boolean = false;
  editarNombre: boolean = false;
  editarAcercaDe: boolean = false;
  text: string = "";
  campoEditablePerfil = new FormControl('');
  campoEditableNombre = new FormControl('');
  campoEditableAcercaDe = new FormControl('');
  
  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {

  }
  datospersona: any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data => {
      this.datospersona = data.persona;
    })
  }
  contacto() {
    console.log("contacto"); //poner algo para contactarse!
  }

  UsuarioLogueado() {
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
      return true;
    else
      return false;
  }


  


  HabilitarEdicionImagenPerfil() {
    this.campoEditablePerfil.setValue(this.datospersona.urlImagenPerfil)
    this.editarImagenPerfil = true;
  }
  EditarImagenPerfil() {
    let datospersonamodificados: Persona = this.datospersona;
    datospersonamodificados.urlImagenPerfil = this.campoEditablePerfil.value;
      this.http.put<Persona>('http://localhost:8080/editar/persona/', datospersonamodificados)
      .subscribe(data => this.datospersona = data);
      this.editarImagenPerfil = false;
  }
  salirEdicionImagenPerfil() {
    this.editarImagenPerfil = false;
  }


  HabilitarEdicionNombre(){
    this.campoEditableNombre.setValue(this.datospersona.nombre)
    this.editarNombre = true;
  }
  EditarNombre(){
    let datospersonamodificados: Persona = this.datospersona;
    datospersonamodificados.nombre = this.campoEditableNombre.value;
      this.http.put<Persona>('http://localhost:8080/editar/persona/', datospersonamodificados)
      .subscribe(data => this.datospersona = data);
      this.editarNombre = false;
  }
  SalirEdicionNombre(){
    this.editarNombre = false;
  }


  HabilitarEdicionAcercaDe(){
    this.campoEditableAcercaDe.setValue(this.datospersona.acercade)
    this.editarAcercaDe = true;
  }
  GuardarAcercaDe(){
    let datospersonamodificados: Persona = this.datospersona;
    datospersonamodificados.acercade = this.campoEditableAcercaDe.value;
      this.http.put<Persona>('http://localhost:8080/editar/persona/', datospersonamodificados)
      .subscribe(data => this.datospersona = data);
      this.editarAcercaDe = false;
  }
  SalirEdicionAcercaDe(){
    this.editarAcercaDe = false;
  }

}