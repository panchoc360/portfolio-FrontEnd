import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  verAgregarEducacion: boolean = false;
  editareducacion: boolean = false;
  eduaeditar: string = "";

  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService) { }
  datosEducacion:any;
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;
  text:string = "";
  day: string = "";

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.datosEducacion = data.educacion;
    })
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return false;
  }
  AgregarEducacion(){

    //aca va codigo para agregar la experiencia
  }
  salirAgregarEducacion(){
    this.verAgregarEducacion = false;
  }
  VerAgregarEducacion(){
    this.verAgregarEducacion = true;
  }

  editareducacionparticular(eduid : string)
  {
    this.eduaeditar = eduid;
    console.log(eduid);
  }

  editable() : string
  {
    return this.eduaeditar;
  }
  salirEdicionEducacion(){
    this.eduaeditar = "";

  }
  EditarEducacion(){
    console.log("Edu " + this.eduaeditar + " editada");
  }
}
