import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from 'src/app/Modelos';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

@Input() btnIngresar: boolean = false;
verAgregarProyecto: boolean = false;
editarproyecto: boolean = false;
proyectoaeditar?: number = undefined;
formNuevo: FormGroup;
formEditar: FormGroup;

constructor(private formBuilder: FormBuilder, private portfolioService: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
  this.formNuevo = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    url: [''],
    urlImagen: ['', [Validators.required]],
  })
  this.formEditar = this.formBuilder.group({
    idProyecto: [''],
    nombre: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    url: [''],
    urlImagen: ['', [Validators.required]],
  })
 }
  datosProyectos:any;
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data =>{
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
    let nuevoProyecto: Proyecto = this.formNuevo.value;
    this.portfolioService.agregarProyecto(nuevoProyecto).subscribe(data => this.ngOnInit());
    this.verAgregarProyecto = false;
  }
  salirAgregarProyecto(){
    this.verAgregarProyecto = false;
  }
  VerAgregarProyecto(){
    this.verAgregarProyecto = true;
  }

  editarproyectoparticular(proyectoid : number)
  {
    let editarProyecto: Proyecto = this.datosProyectos[proyectoid];

    this.formEditar.patchValue({
      idProyecto: editarProyecto.idProyecto,
      nombre: editarProyecto?.nombre,
      fecha: editarProyecto?.fecha,
      descripcion: editarProyecto?.descripcion,
      url: editarProyecto?.url,
      urlImagen: editarProyecto?.urlImagen
    })
    this.proyectoaeditar = proyectoid;
  }

  editable() : number | undefined
  {
    return this.proyectoaeditar;
  }

  salirEdicionProyecto(){
    this.proyectoaeditar = undefined;

  }
  EditarProyecto(){
    let editarProyecto: Proyecto = this.formEditar.value;
    this.portfolioService.editarProyecto(editarProyecto).subscribe(data => this.ngOnInit());
    this.proyectoaeditar = undefined;
  }

  eliminarProyecto(proyectoid : number){
    this.portfolioService.eliminarProyecto(proyectoid).subscribe(data => this.ngOnInit());
  }
}
