import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  verAgregarExperiencia: boolean = true; //pasar a false
  editarexperiencia: boolean = false; //pasar a false 
  expaeditar: string = "";

  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService) { }

  datosExperiencia:any;
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;
  text:string = "";
  day: string = "";



  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.datosExperiencia = data.experiencia;
    })
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return true; //cambiar a false
  }

  AgregarExperiencia(){

    //aca va codigo para agregar la experiencia
  }
  salirAgregarExperiencia(){
    this.verAgregarExperiencia = false;
  }
  VerAgregarExperiencia(){
    this.verAgregarExperiencia = true;
  }

  editarexperienciaparticular(expid : string)
  {
    this.expaeditar = expid;
    console.log(expid);
  }

  editable() : string
  {
    return this.expaeditar;
  }
  salirEdicionExperiencia(){
    this.expaeditar = "";

  }
  EditarExperiencia(){
    console.log("Exp " + this.expaeditar + " editada");
  }
}
