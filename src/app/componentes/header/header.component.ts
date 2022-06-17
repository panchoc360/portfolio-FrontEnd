import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Router } from '@angular/router';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { AppRoutingModule } from '../app-routing.module/app-routing.module';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() isLogged: boolean = false;
  @Output() btnIngresar = new EventEmitter();

  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService, private ruta: Router) {
  }

  datospersona:any;
  faCoffee = faPen;
  
  ngOnInit(): void {
    
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.datospersona = data.persona[0];
    });
    console.log(this.loggeado.currentUserSubject.value);
  }

  onClick(){
    this.btnIngresar.emit();
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return false;
  }

  BotonLogin(){
    if (this.UsuarioLogueado())
    console.log("Salir")
    else
    this.ruta.navigate(['/iniciarsesion']);
  }
}
