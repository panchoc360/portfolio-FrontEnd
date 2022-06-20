import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  @Input() isLogged: boolean = false;
  faCoffee = faPen;

  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService) { 
    //this.isLogged = loggeado.IsLogged();
  }

  datospersona:any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.datospersona = data.persona;
    })
  }
  contacto(){
    console.log("contacto");
  }
  anadirSeccion(){
    console.log("añadir seccion");
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return true; //cambiar a false
  }
}