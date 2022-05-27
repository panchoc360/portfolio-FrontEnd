import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  
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