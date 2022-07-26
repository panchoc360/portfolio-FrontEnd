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
  expaeditar: string = "";
  agregarLugar = new FormControl('');
  agregarCargo = new FormControl('');
  agregarFechaInicio = new FormControl('');
  agregarFechaFin = new FormControl('');
  agregardescripcion = new FormControl('');
  agregarURLLogo = new FormControl('');
  agregarURLPagina = new FormControl('');
  formEdit!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private datosPortfolio: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
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
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
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
      this.http.post<Experiencia>('http://localhost:8080/crear/experiencia/', nuevaExperiencia)
      .subscribe(data => this.ngOnInit());
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
    let editarExperiencia: Experiencia = this.datosExperiencia[expid - 1];
    this.formEdit.patchValue({
      idExperiencia: expid,
      nombreLugar: editarExperiencia.nombreLugar,
      cargoOcupado: editarExperiencia.cargoOcupado,
      inicio: editarExperiencia.inicio,
      fin: editarExperiencia.fin,
      descripcion: editarExperiencia.descripcion,
      urlLogo: editarExperiencia.urlLogo,
      urlWebPage: editarExperiencia.urlWebPage
    })
    this.expaeditar = String(expid);
  }

  eliminarExperiencia(expid : string){
    console.log("Eliminar " + expid)
    this.http.delete<any>('http://localhost:8080/borrar/experiencia/' + expid)
    .subscribe(data => {this.datosExperiencia = data;
    console.log(data)});
  }
  editable() : string
  {
    return this.expaeditar;
  }
  salirEdicionExperiencia(){
    this.expaeditar = "";

  }
  EditarExperiencia(){

    let editarExperiencia: Experiencia = this.formEdit.value;
      this.http.put<Experiencia>('http://localhost:8080/editar/experiencia/', editarExperiencia)
      .subscribe(data => this.ngOnInit());
      this.expaeditar = "";

  }
}
