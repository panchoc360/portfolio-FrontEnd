import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Experiencia } from 'src/app/Modelos';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  verAgregarExperiencia: boolean = false;
  editarexperiencia: boolean = false;
  expaeditar?: number = undefined;
  agregarLugar = new FormControl('');
  agregarCargo = new FormControl('');
  agregarFechaInicio = new FormControl('');
  agregarFechaFin = new FormControl('');
  agregardescripcion = new FormControl('');
  agregarURLLogo = new FormControl('');
  agregarURLPagina = new FormControl('');
  formEdit!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private portfolioService: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
    this.formEdit = this.formBuilder.group({
      idExperiencia: [''],
      nombreLugar: ['', [Validators.required]],
      cargoOcupado: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: [''],
      descripcion: ['', [Validators.required]],
      urlLogo: ['', [Validators.required]],
      urlWebPage: [''],
    })
   }

  datosExperiencia:any;
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;
  text:string = "";
  day: string = "";



  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data =>{
      this.datosExperiencia = data.experiencia;
    })
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return false;
  }

  AgregarExperiencia(){
    let nuevaExperiencia: Experiencia = {nombreLugar: this.agregarLugar.value , cargoOcupado: this.agregarCargo.value, inicio: this.agregarFechaInicio.value, fin: this.agregarFechaFin.value, descripcion: this.agregardescripcion.value, urlLogo: this.agregarURLLogo.value, urlWebPage: this.agregarURLPagina.value };
    this.portfolioService.agregarExperiencia(nuevaExperiencia).subscribe(data => this.ngOnInit());
      this.verAgregarExperiencia = false;
  // VER porque hay que refrescar la pagina para visualizar la nueva exp
  }
  salirAgregarExperiencia(){
    this.verAgregarExperiencia = false;
  }
  VerAgregarExperiencia(){
    this.verAgregarExperiencia = true;
  }

  editarexperienciaparticular(expid : number)
  {
    let editarExperiencia: Experiencia = this.datosExperiencia[expid];

    this.formEdit.patchValue({
      idExperiencia: editarExperiencia.idExperiencia,
      nombreLugar: editarExperiencia.nombreLugar,
      cargoOcupado: editarExperiencia.cargoOcupado,
      inicio: editarExperiencia.inicio,
      fin: editarExperiencia.fin,
      descripcion: editarExperiencia.descripcion,
      urlLogo: editarExperiencia.urlLogo,
      urlWebPage: editarExperiencia.urlWebPage
    })
    this.expaeditar = expid;
  }

  eliminarExperiencia(expid : number){
 this.portfolioService.eliminarExperiencia(expid).subscribe(data => {this.datosExperiencia = data;
    console.log(data)});
  }
  editable() : number | undefined
  {
    return this.expaeditar;
  }
  salirEdicionExperiencia(){
    this.expaeditar = undefined;

  }
  EditarExperiencia(){

    let editarExperiencia: Experiencia = this.formEdit.value;
    this.portfolioService.editarExperiencia(editarExperiencia).subscribe(data => this.ngOnInit());
      this.expaeditar = undefined;

  }
}
