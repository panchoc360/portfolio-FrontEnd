import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() btnClick = new EventEmitter();
  constructor(private datosPortfolio: PortfolioService) { }
  datospersona:any;
  faCoffee = faCoffee;
  loggeado:boolean = false;
  
  ngOnInit(): void {
    
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.datospersona = data.persona[0];
    });
  }

  onClick(){
    this.loggeado = !this.loggeado;
    this.btnClick.emit();
  }
}
