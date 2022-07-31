import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Educacion } from 'src/app/Modelos';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  verAgregarEducacion: boolean = false;
  editareducacion: boolean = false;
  eduaeditar?: number | undefined;
  formNuevo: FormGroup;
  formEditar: FormGroup;

  constructor(private formBuilder: FormBuilder, private portfolioService: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
    this.formNuevo = this.formBuilder.group({
      nombreInstitucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required,]],
      fin: [''],
      urlImagen: ['', [Validators.required]],
    })
    this.formEditar = this.formBuilder.group({
      idEducacion: [''],
      nombreInstitucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: [''],
      urlImagen: ['', [Validators.required]],
    })
  }
  datosEducacion: Educacion[] = [];
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;
  text: string = "";
  day: string = "";

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data => {
      this.datosEducacion = data.educacion;
    })
  }
  UsuarioLogueado() {
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
      return true;
    else
      return false;
  }
  AgregarEducacion() {
    let nuevaEducacion: Educacion = this.formNuevo.value;
    console.log(nuevaEducacion);
    this.portfolioService.agregarEducacion(nuevaEducacion)
    .subscribe(data => this.ngOnInit());
    this.verAgregarEducacion = false;
  }
  salirAgregarEducacion() {
    this.verAgregarEducacion = false;
  }
  VerAgregarEducacion() {
    this.verAgregarEducacion = true;
  }

  editareducacionparticular(eduid: number) {
    let editarEducacion: Educacion = this.datosEducacion[eduid];
    this.formEditar.patchValue({
      idEducacion: editarEducacion.idEducacion,
      nombreInstitucion: editarEducacion.nombreInstitucion,
      titulo: editarEducacion.titulo,
      inicio: editarEducacion.inicio,
      fin: editarEducacion.fin,
      urlImagen: editarEducacion.urlImagen
    })
    this.eduaeditar = eduid;
  }

  editable(): number | undefined {
    return this.eduaeditar;
  }
  salirEdicionEducacion() {
    this.eduaeditar = undefined;

  }
  EditarEducacion() {
    let editarEducacion: Educacion = this.formEditar.value;
    console.log(editarEducacion);
    this.portfolioService.editarEducacion(editarEducacion).subscribe(data => this.ngOnInit());
    this.eduaeditar = undefined;
  }
  eliminarEducacion(eduid: number) {
    console.log(eduid);
    this.portfolioService.eliminarEducacion(eduid)
    .subscribe(data => this.datosEducacion = data);
  }
}
//this.datosEducacion.filter(t => t.idEducacion !== eduid)