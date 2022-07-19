import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

@Input() btnIngresar: boolean = false;
verAgregarProyecto: boolean = false;
editarproyecto: boolean = false;
proyectoaeditar: string = "";

  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService) { }

  datosProyectos:any;
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.datosProyectos = data.proyecto;
    })
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return false;
  }
  AgregarProyecto(){

    //aca va codigo para agregar la experiencia
  }
  salirAgregarProyecto(){
    this.verAgregarProyecto = false;
  }
  VerAgregarProyecto(){
    this.verAgregarProyecto = true;
  }

  editarproyectoparticular(proyectoid : string)
  {
    this.proyectoaeditar = proyectoid;
    console.log(proyectoid);
  }

  editable() : string
  {
    return this.proyectoaeditar;
  }
  salirEdicionProyecto(){
    this.proyectoaeditar = "";

  }
  EditarProyecto(){
    console.log("Proyecto " + this.proyectoaeditar + " editada");
  }
}
