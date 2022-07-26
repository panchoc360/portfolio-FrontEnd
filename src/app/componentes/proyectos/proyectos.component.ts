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
proyectoaeditar: string = "";
formNuevo: FormGroup;
formEditar: FormGroup;

constructor(private formBuilder: FormBuilder, private datosPortfolio: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
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
    let nuevoProyecto: Proyecto = this.formNuevo.value;
    console.log(nuevoProyecto);
    this.http.post<Proyecto>('http://localhost:8080/crear/proyecto/', nuevoProyecto)
    .subscribe(data => this.ngOnInit());
    
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
    let editarProyecto: Proyecto = this.datosProyectos[proyectoid - 1];
    this.formEditar.patchValue({
      idProyecto: proyectoid,
      nombre: editarProyecto.nombre,
      fecha: editarProyecto.fecha,
      descripcion: editarProyecto.descripcion,
      url: editarProyecto.url,
      urlImagen: editarProyecto.urlImagen
    })
    this.proyectoaeditar = String(proyectoid);
  }

  editable() : string
  {
    return this.proyectoaeditar;
  }
  salirEdicionProyecto(){
    this.proyectoaeditar = "";

  }
  EditarProyecto(){
    let editarProyecto: Proyecto = this.formEditar.value;
    this.http.put<Proyecto>('http://localhost:8080/editar/proyecto/', editarProyecto)
    .subscribe(data => this.ngOnInit());
    this.proyectoaeditar = "";
  }

  eliminarProyecto(proyectoid : string){
    console.log("Eliminar " + proyectoid)
    this.http.delete<any>('http://localhost:8080/borrar/proyecto/' + proyectoid)
    .subscribe(data => {console.log(data)});
  }
}
