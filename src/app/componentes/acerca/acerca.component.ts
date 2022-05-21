import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  contacto(){
    console.log("contacto");
  }
  anadirSeccion(){
    console.log("añadir seccion");
  }
}
