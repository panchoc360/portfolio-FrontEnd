import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  @Input() btniconoeditar: boolean = false;
  @Output() btnClick = new EventEmitter();
  faCoffee = faCoffee;
  loggeado: boolean = true;
  constructor(private datosPortfolio: PortfolioService) { }

  datospersona:any;
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.datospersona = data.persona[0];
    })
  }
  contacto(){
    console.log("contacto");
  }
  anadirSeccion(){
    console.log("añadir seccion");
  }
}